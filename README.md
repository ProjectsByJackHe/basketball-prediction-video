# Simple UI dashboard for collecting pose data as JSON

## TLDR;

This repo uses the ML5 PoseNet (tensorflow.js) model to label poses from a video file. You can tweak the canvas size and other model attributes to suit your video and use-case.


Afterwards, you can set intervals of time while watching your video in real time to save the labelled data as JSON. 


## JSON Output - Data Structure

Since this tool is designed to collect keypoint data from PoseNet for basketball shooting, we have each SHOT object as:

{
    got_bucket: boolean // did the shot go in?

    form: [
        POSE #1, // start of basketball shot 
        POSE #2, 
        .
        .
        .
        POSE #N // end of basketball shot
    ]
}

- Each POSE is composed of:

{
    keypoints ...
    joint locations ...
    confidence ...
}
