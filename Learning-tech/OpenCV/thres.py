import cv2 as cv

img=cv.imread('Photos/cats.jpg')
cv.imshow('Cats',img)

gray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
cv.imshow('Gray',gray)


# simple thresholding
threshold,thresh=cv.threshold(gray,150,255,cv.THRESH_BINARY)
cv.imshow('Simple Thresholded',thresh)


threshold,thresh_inv=cv.threshold(gray,150,255,cv.THRESH_BINARY_INV)
cv.imshow('Simple Thresholded inverse',thresh_inv)

# Apdativ thresholding
adaptive_thresh=cv.adaptiveThreshold(gray,255,cv.ADAPTIVE_THRESH_MEAN_C,cv.THRESH_BINARY,11,9)
cv.imshow('Adaptive Thresholding',adaptive_thresh)


cv.waitKey(0)