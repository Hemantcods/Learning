import cv2 as cv

img = cv.imread('Photos/cats.jpg')
cv.imshow('Cats', img)

gray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
cv.imshow('Gray',gray)


# Laplacian method
lap=cv.Laplacian(gray,cv.CV_64F)
lap=cv.convertScaleAbs(lap)
cv.imshow('Laplacian',lap)

# sobel method
sobelx=cv.Sobel(gray,cv.CV_64F,1,0)
sobely=cv.Sobel(gray,cv.CV_64F,0,1)

combined_sobel=cv.bitwise_or(sobelx,sobely)

cv.imshow('Sobelx',sobelx)
cv.imshow('Sobely',sobely)
cv.imshow('Combined Sobel',combined_sobel)


canny=cv.Canny(gray,150,175)
cv.imshow('Canny',canny)



cv.waitKey(0)