import cv2
import numpy as np
from os import listdir

imagesDir = "images/"

imagesPath = listdir(imagesDir)

print(imagesPath)

def image_resize(image, width = None, height = None, inter = cv2.INTER_AREA):
    # initialize the dimensions of the image to be resized and
    # grab the image size
    dim = None
    (h, w) = image.shape[:2]

    # if both the width and height are None, then return the
    # original image
    if width is None and height is None:
        return image

    # check to see if the width is None
    if width is None:
        # calculate the ratio of the height and construct the
        # dimensions
        r = height / float(h)
        dim = (int(w * r), height)

    # otherwise, the height is None
    else:
        # calculate the ratio of the width and construct the
        # dimensions
        r = width / float(w)
        dim = (width, int(h * r))

    # resize the image
    resized = cv2.resize(image, dim, interpolation = inter)

    # return the resized image
    return resized


for imgName in imagesPath:
    img = cv2.imread(imagesDir + imgName)

    # img = image_resize(img, width=500)

    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # smooth the image with alternative closing and opening
    # with an enlarging kernel
    morph = img.copy()

    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 1))
    morph = cv2.morphologyEx(morph, cv2.MORPH_CLOSE, kernel)
    morph = cv2.morphologyEx(morph, cv2.MORPH_OPEN, kernel)

    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))

    # take morphological gradient
    gradient_image = cv2.morphologyEx(morph, cv2.MORPH_GRADIENT, kernel)

    blur = cv2.GaussianBlur(gradient_image, (7, 7), 2)

    edges = cv2.Canny(blur,10,50)


    # split the gradient image into channels
    # image_channels = np.split(np.asarray(gradient_image), 3, axis=2)

    # channel_height, channel_width, _ = image_channels[0].shape

    # apply Otsu threshold to each channel
    # for i in range(0, 3):
    #     _, image_channels[i] = cv2.threshold(~image_channels[i], 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY)
    #     image_channels[i] = np.reshape(image_channels[i], newshape=(channel_height, channel_width, 1))

    # # merge the channels
    # image_channels = np.concatenate((image_channels[0], image_channels[1], image_channels[2]), axis=2)

        



    cv2.imshow("image", edges)
    cv2.waitKey(0)


cv2.destroyAllWindows()