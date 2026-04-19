import cv2 as cv 
import matplotlib.pyplot as plt



img=cv.imread('photos/park.jpg')
cv.imshow('Park',img)

# plt.imshow(img)
# plt.show()



# # BGR to grayscale
# gray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
# cv.imshow('Gray',gray)

# # BGR to hsv
# hsv=cv.cvtColor(img,cv.COLOR_BGR2HSV)
# cv.imshow('HSV',hsv)

# # BGR to lab
# lab=cv.cvtColor(img,cv.COLOR_BGR2LAB)
# cv.imshow('LAB',lab)

# # BGR to BGR2GRAY
bgr2gray=cv.cvtColor(img,cv.COLOR_BGR2RGB)
cv.imshow('BGR2GRAY',bgr2gray)

plt.imshow(bgr2gray)
plt.show()


# All vice versa can b done also

cv.waitKey(0)