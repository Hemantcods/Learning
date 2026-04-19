import cv2 as cv 

img=cv.imread('./photos/cat.jpg')
cv.imshow('cat',img)

# Adding a greyscale filter
gray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
cv.imshow('gray',gray)

# Blur
blur=cv.GaussianBlur(img,(7,7),cv.BORDER_DEFAULT)
cv.imshow('blur',blur)

# Edge Cascade(edge detection)
canny=cv.Canny(img,125,175)
cv.imshow('canny',canny)

# Dilating the image (edge thickness increase)
dialated=cv.dilate(canny,(7,7),iterations=3)
cv.imshow('dialated',dialated)

# Eroding(edge thickness decrease)
eroded=cv.erode(dialated,(7,7),iterations=3)
cv.imshow('eroded',eroded)

# Resize
resized=cv.resize(img,(500,500),interpolation=cv.INTER_CUBIC)
cv.imshow('resized',resized)

# Cropping
cropped=img[50:200,200:400]
cv.imshow('cropped',cropped)




cv.waitKey(0)