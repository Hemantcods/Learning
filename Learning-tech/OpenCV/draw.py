import cv2 as cv
import numpy as np

blank=np.zeros((500,500,3),dtype='uint8')   # uint8 is for images
#               heiht,width,colourchannels
cv.imshow('blank',blank)

# painting the image in certain way
# blank[200:300,300:400]=225,0,0
# cv.imshow('blue',blank)

# drawing a rectangle
cv.rectangle(blank,(0,0),(500,250),(0,255,0),thickness=2)
#                         x     y    colour channel        use cv.filled in thickness for filling the rectangle
cv.imshow('rectangle',blank)

# drawing a circle
cv.circle(blank,(blank.shape[1]//2,blank.shape[0]//2),50,(0,0,255),thickness=-1)
cv.imshow('circle',blank)


# drawing a line
cv.line(blank,(0,0),(blank.shape[1]//2,blank.shape[0]//2),(255,255,255),thickness=3)
cv.imshow('line',blank)

# writing text on image
cv.putText(blank,'hello',(225,225),cv.FONT_HERSHEY_TRIPLEX,1.0,(255,255,255),2)
cv.imshow('text',blank)
cv.waitKey(0)