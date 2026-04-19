import cv2 as cv 
import numpy as np

img=cv.imread('Photos/cat.jpg')

cv.imshow('Cat',img)

# translate(moving the image along x adn y axis)
def translate(img,x,y):
    transMat=np.float32([[1,0,x],[0,1,y]])
    dimensions=(img.shape[1],img.shape[0])
    return cv.warpAffine(img,transMat,dimensions)

translated=translate(img,100,100)
cv.imshow('Translated',translated)

# rotate
def rotate(img,angle,rotPoint=None):
    (height,width)=img.shape[:2]
    if rotPoint is None:
        rotPoint=(width//2,height//2)
    rotMat=cv.getRotationMatrix2D(rotPoint,angle,1.0)
    dimensions=(width,height)
    return cv.warpAffine(img,rotMat,dimensions)

rotated=rotate(img,45)
cv.imshow('Rotated',rotated)

# flipping
fliped=cv.flip(img,1)
# 0 for flip along x-axis
# 1 for flip along y-axis
# -1 for flip along both axis
cv.imshow('Fliped',fliped)

# cropping
cropped=img[200:400,300:400]
cv.imshow('Cropped',cropped)


cv.waitKey(0)