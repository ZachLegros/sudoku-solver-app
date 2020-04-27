import cv2

from os import listdir

imagesDir = "images/"

imagesPath = listdir(imagesDir)

print(imagesPath)

for imgName in imagesPath:
    img = cv2.imread(imagesDir + imgName)


    img = cv2.blur(img, (5, 5))

    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv)

    thresh0 = cv2.adaptiveThreshold(s, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2)
    thresh1 = cv2.adaptiveThreshold(v, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2)
    thresh2 = cv2.adaptiveThreshold(v, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2)
    thresh = cv2.bitwise_or(thresh0, thresh1)

    cv2.imshow("gray", thresh)
    cv2.waitKey(0)

cv2.destroyAllWindows()