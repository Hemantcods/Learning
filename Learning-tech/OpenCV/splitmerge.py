import cv2 as cv 
import matplotlib.pyplot as plt
import numpy as np




img=cv.imread('photos/park.jpg')
cv.imshow('Park',img)

#Blank image
blank=np.zeros(img.shape[:2],dtype='uint8')
cv.imshow('Blank',blank)

#

# splitting the colour channels

b,g,r=cv.split(img)
cv.imshow('Blue',b)
cv.imshow('Green',g)
cv.imshow('Red',r)

merged=cv.merge([b,g,r])
cv.imshow('Merged',merged)


blue=cv.merge([b,blank,blank])
cv.imshow('Blue',blue)
green=cv.merge([blank,g,blank])
cv.imshow('Green',green)
red=cv.merge([blank,blank,r])
cv.imshow('Red',red)


# Shapes
print(f'shape of img: {img.shape}')
print(f'shape of b: {b.shape}')
print(f'shape of g: {g.shape}')
print(f'shape of r: {r.shape}')

cv.waitKey(0)