import cv2 as cv


img=cv.imread('photos/cats.jpg')
cv.imshow('Cats',img)

# averaging
blur=cv.blur(img,(3,3))
cv.imshow('Average Blur',blur)

# gaussian  blur 
gaussian=cv.GaussianBlur(img,(3,3),0)
cv.imshow('Gaussian Blur',gaussian)

# median blur
median=cv.medianBlur(img,3)
cv.imshow('Median Blur',median)

# bilateral blur(retains the edges as well)
bilateral=cv.bilateralFilter(img,5,15,15)
cv.imshow('Bilateral Blur',bilateral)


cv.waitKey(0)