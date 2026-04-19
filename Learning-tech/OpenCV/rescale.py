import cv2 as cv
def rescaleframe(frame, scale=0.75):
    # for images, video,live video
    width=int(frame.shape[0]*scale)
    height=int(frame.shape[1]*scale)

    dimensions=(width,height)

    return cv.resize(frame,dimensions,interpolation=cv.INTER_AREA)


def changeRes(width,height):
    # for live video only
    capture.set(3,width)
    capture.set(4,height)
# for image

# img=cv.imread('./photos/cat_large.jpg')  
# cv.imshow('cat',img) 
# rescaled=rescaleframe(img,scale=0.25)
# cv.imshow('rescaled cat',rescaled)
# cv.waitKey(0)    


# for video

capture=cv.VideoCapture('./videos/dog.mp4')    # it takes int for camera inputs
while True:
    isTrue,frame=capture.read()
    rescaled=rescaleframe(frame)
    cv.imshow('video',rescaled)

    if cv.waitKey(20) & 0xFF==ord('d'):
        break

capture.release()    
cv.destroyAllWindows()


