let angle = 0;
let maxRadius;
let radius;
let trailLength = 50; // Length of the ghosting trail
let trail = [];
let previousRadius;
let scalingSpeed;

function setup() {
    createCanvas(800, 800);
    noStroke();
    fill(255); // White color for the particle
    startNewCycle();
}

function draw() {
    // Draw a semi-transparent black rectangle to create a fading trail effect
    fill(0, 20); // Adjust the second parameter to change the trail length
    rect(0, 0, width, height);

    // Update the radius based on the scaling speed
    radius -= scalingSpeed;

    // Clear the trail if the radius resets to maximum
    if (radius > previousRadius) {
        trail = [];
    }

    previousRadius = radius;

    let x = width / 2 + radius * cos(angle);
    let y = height / 2 + radius * sin(angle);

    // Add the current position to the trail
    trail.push({ x, y });

    // Keep only the last 'trailLength' positions in the trail
    if (trail.length > trailLength) {
        trail.shift();
    }

    // Draw the particles along the trail
    for (let i = 0; i < trail.length - 1; i++) {
        let pos = trail[i];
        let nextPos = trail[i + 1];
        let alpha = map(i, 0, trail.length - 1, 50, 255); // Gradually increase the alpha value
        let size = map(i, 0, trail.length - 1, 1, 5); // Gradually increase the size of the particles
        fill(255, alpha);

        let numSteps = dist(pos.x, pos.y, nextPos.x, nextPos.y) / 2.5; // Adjust the step size to ensure no gaps
        for (let j = 0; j < numSteps; j++) {
            let interX = lerp(pos.x, nextPos.x, j / numSteps);
            let interY = lerp(pos.y, nextPos.y, j / numSteps);
            ellipse(interX, interY, size, size);
        }
    }

    // Ensure the final particle in the trail is drawn
    if (trail.length > 0) {
        let finalPos = trail[trail.length - 1];
        fill(255, 50);
        ellipse(finalPos.x, finalPos.y, 5, 5); // Largest size for the newest particle
    }

    angle += 0.02; // Increment the angle for circular motion

    // Restart the cycle if the radius scales down to 0 or below
    if (radius <= 0) {
        startNewCycle();
    }
}

function startNewCycle() {
    maxRadius = random(5, 795);
    radius = maxRadius;
    previousRadius = maxRadius;
    scalingSpeed = maxRadius / 200; // Adjust this value to control the speed of scaling down
    trail = [];
    angle = random(TWO_PI); // Set the starting angle to a random value between 0 and TWO_PI
    background(0); // Clear the background
}
