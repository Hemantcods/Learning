import cv2 as cv
import matplotlib.pyplot as plt


img=cv.imread('Photos/cats.jpg')
cv.imshow('Cats',img)

gray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
cv.imshow('Gray',gray)

# # histogram
# hist=cv.calcHist([gray],[0],None,[256],[0,256])
# plt.figure()
# plt.title('Grayscale Histogram')
# plt.xlabel('Bins')
# plt.ylabel('# of pixels')
# plt.plot(hist)
# plt.xlim([0,256])
# plt.show()

# colour histogram
col=('b','g','r')
for i,col in enumerate(col):
    hist=cv.calcHist([img],[i],None,[256],[0,256])
    plt.plot(hist,color=col)
    plt.xlim([0,256])
plt.xlabel('Bins')
plt.ylabel('# of pixels')    
plt.show()



cv.waitKey(0)