# Simple UI dashboard for collecting pose data as JSON

## TLDR;

This repo uses the ML5 PoseNet (tensorflow.js) model to label poses from a video file. You can tweak the canvas size and other model attributes to suit your video and use-case.


Afterwards, you can set intervals of time while watching your video in real time to save the labelled data as JSON. 


## JSON Output - Data Structure

Entire dataset should be packaged and distributed as a .zip with 100 - 150 JSON files, each file with data for 100 basketball SHOTS.

Here is what each JSON file should look like:

```
{
    time: string,  // optional field
    makes: number, // optional field
    misses: number, // optional field
    shots: [
        SHOT #1,
        SHOT #2,
        .
        .
        .
        SHOT #100
    ]
}
```

Since this tool is designed to collect keypoint data from PoseNet for basketball shooting, we have each SHOT object as:

### SINGLE BASKETBALL SHOT
```
{ 
    got_bucket: Integer // 1 if the shot went in, 0 otherwise

    form: [
        POSE #1, // start of basketball shot 
        POSE #2, 
        .
        .
        .
        POSE #N // end of basketball shot
    ]
}
```

- Each POSE is composed of:
```
{
    keypoints ...
    joint locations ...
    confidence ...
}
```

Data persistence approaches:

- Local storage (5 MB max)
- Write to file on disk (need to write custom express web server)

## Best User Experience

- cmd / ctrl + (-) to zoom out and view both the canvas and video controls in the same window. 

