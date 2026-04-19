import cv2 as cv

# img=cv.imread('./photos/cat_large.jpg')  

# cv.imshow('cat',img)    


# Reading videos

capture=cv.VideoCapture('./videos/dog.mp4')    # it takes int for camera inputs
while True:
    isTrue,frame=capture.read()
    cv.imshow('video',frame)

    if cv.waitKey(20) & 0xFF==ord('d'):
        break

capture.release()    
cv.destroyAllWindows()
