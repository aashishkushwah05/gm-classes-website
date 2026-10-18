# Reproduces public/faculty/cleaned/*.png from the original photos in public/faculty/.
# Run from the project root:  python3 tools/clean-faculty-photos.py   (needs numpy, opencv-python, pillow)
# Only pixels inside the small per-image "boxes" that match the leftover-text colour are replaced with the
# surrounding plain background; every other pixel (faces, hair, clothing, design shapes) is copied unchanged.
import numpy as np, cv2, json
from PIL import Image
SRC="public/faculty/{}.jpg"; DST="public/faculty/cleaned/{}.png"
def lum(a): return 0.299*a[...,0]+0.587*a[...,1]+0.114*a[...,2]
def chroma(a): return a.max(-1).astype(int)-a.min(-1)
def box_mask(shape,b):
    m=np.zeros(shape[:2],bool); x0,y0,x1,y1=b; m[y0:y1,x0:x1]=True; return m
def skin_like(a):   # skin / peach fabric / saree: bright and warm — never touched
    r,g,b=[a[...,i].astype(int) for i in range(3)]; return (r>=170)&(r>g+22)&(g>=b)
def hair_like(a):   return (a.max(-1)<80)&(chroma(a)<30)
# Core text-colour rules (dark, saturated ink) — each applies ONLY inside that image's search boxes.
def green(a):  r,g,b=[a[...,i].astype(int) for i in range(3)]; return (g>r+15)&(g>b+25)&(lum(a)<170)
def brown(a):  r,g,b=[a[...,i].astype(int) for i in range(3)]; return (r<140)&(r>g+25)&(g>b+8)&(lum(a)<120)
def maroon(a): r,g,b=[a[...,i].astype(int) for i in range(3)]; return (r<135)&(r>g+20)&(lum(a)<90)
def purple(a): r,g,b=[a[...,i].astype(int) for i in range(3)]; return (r<135)&(b>g+25)&(r>g+25)&(lum(a)<90)
def zone(H,W,rects):
    z=np.zeros((H,W),bool)
    for x0,y0,x1,y1 in rects: z[y0:y1,x0:x1]=True
    return z
# (skin zones, hair zones) per image, in pixel rects (x0,y0,x1,y1). Outside these, nothing is protected, so letter outlines are removed fully.
PROTECT={
 "apoorva-sen":          dict(skin=[], hair=[]),
 "krishna-gopal-mandloi":dict(skin=[(108,246,150,340)], hair=[(124,150,150,340)]),   # ear + face/hair to the right of the text
 "hemlata-yadav":        dict(skin=[(46,410,70,530)], hair=[]),                      # peach dupatta edge right of the brown stem
 "shivani-sen":          dict(skin=[(6,430,30,520)], hair=[]),                       # saree edge
}
def tint(a):  # brownish leftover edge pixels (not the salmon-coloured ear)
    r,g,b=[a[...,i].astype(int) for i in range(3)]; return (r>g+10)&(lum(a)<215)&~((r>=195)&(g>=105))
EXTRA={"krishna-gopal-mandloi":[((104,268,114,281),tint),((121,248,128,255),tint)]}   # stray outline pixels where the old "l" met the ear
CONFIG={
 "apoorva-sen":          dict(boxes=[(0,185,105,305)],  rule=green),
 "krishna-gopal-mandloi":dict(boxes=[(0,172,126,330)],  rule=brown),
 "hemlata-yadav":        dict(boxes=[(0,190,75,300),(0,420,11,540)], rule=maroon),   # "a" + the thin edge sliver. The big brown block (x>=30) is DESIGN and stays.
 "shivani-sen":          dict(boxes=[(0,430,8,516)],    rule=purple),
}
report={}
for name,cfg in CONFIG.items():
    a=np.array(Image.open(SRC.format(name)).convert("RGB")); H,W=a.shape[:2]
    allowed=np.zeros((H,W),bool)
    for b in cfg["boxes"]: allowed|=box_mask(a.shape,b)
    pz=PROTECT[name]; H_,W_=a.shape[:2]
    protected=(skin_like(a)&zone(H_,W_,pz['skin']))|(hair_like(a)&zone(H_,W_,pz['hair']))
    prot_zone=cv2.dilate(protected.astype(np.uint8),np.ones((5,5),np.uint8))>0
    core=cfg["rule"](a)&allowed&~protected
    for bx,rl in EXTRA.get(name,[]):
        bm=box_mask(a.shape,bx); allowed|=bm; core|=rl(a)&bm
    n,lab,st,_=cv2.connectedComponentsWithStats(core.astype(np.uint8),connectivity=8)
    keep=np.zeros_like(core)
    for i in range(1,n):
        if st[i,cv2.CC_STAT_AREA]>=10: keep|=lab==i
    # letter edges are light blends of ink + white: take everything tinted within 4 px of the ink, but never skin/hair zones
    near=cv2.dilate(keep.astype(np.uint8),np.ones((9,9),np.uint8))>0
    halo=near&allowed&((lum(a)<250)|(chroma(a)>8))&~prot_zone
    mask=(keep|halo)&allowed&~protected
    # fill: smooth inpaint that follows the paper-white background; skin/hair/clothing are hidden from the fill so they can't bleed in
    ring=(cv2.dilate(mask.astype(np.uint8),np.ones((31,31),np.uint8))>0)&~mask
    bgpix=ring&(lum(a)>232)&(chroma(a)<20); bg=np.median(a[bgpix],axis=0)
    leak=ring&~bgpix                      # anything near the mask that is NOT plain background (skin, hair, doodles)
    # Inpaint from TRUE background pixels only: leak pixels join the fill region so they can't bleed in,
    # but they are never written back (only `mask` pixels are copied into the output below).
    inp=cv2.inpaint(a,(mask|leak).astype(np.uint8)*255,5,cv2.INPAINT_TELEA)
    out=a.copy(); out[mask]=inp[mask]     # ONLY masked pixels change; every other pixel is the original
    Image.fromarray(out).save(DST.format(name),optimize=True)
    diff=(np.abs(a.astype(int)-out.astype(int)).sum(-1)>0)
    report[name]=dict(changed_px=int(diff.sum()),mask_px=int(mask.sum()),changed_outside_mask=int((diff&~mask).sum()),changed_outside_boxes=int((diff&~allowed).sum()),
                      protected_px_changed=int((diff&protected).sum()))
    print(name,json.dumps(report[name]))
