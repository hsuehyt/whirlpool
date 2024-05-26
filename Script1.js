let angle = 0;
let maxRadius = 795 / 2; // Maximum radius of the invisible circle
let radius = maxRadius;
let trailLength = 50; // Length of the ghosting trail
let trail = [];
let previousRadius = maxRadius;

function setup() {
    createCanvas(800, 800);
    background(0);
    noStroke();
    fill(255); // White color for the particle
}

function draw() {
    // Draw a semi-transparent black rectangle to create a fading trail effect
    fill(0, 20); // Adjust the second parameter to change the trail length
    rect(0, 0, width, height);

    // Calculate the current radius
    radius = maxRadius * (1 - (frameCount % 600) / 600);

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
        let alpha = map(i, 0, trail.length - 1, 255, 50); // Gradually reduce the alpha value
        fill(255, alpha);

        let numSteps = dist(pos.x, pos.y, nextPos.x, nextPos.y) / 2.5; // Adjust the step size to ensure no gaps
        for (let j = 0; j < numSteps; j++) {
            let interX = lerp(pos.x, nextPos.x, j / numSteps);
            let interY = lerp(pos.y, nextPos.y, j / numSteps);
            ellipse(interX, interY, 5, 5);
        }
    }

    // Ensure the final particle in the trail is drawn
    let finalPos = trail[trail.length - 1];
    fill(255, 50);
    ellipse(finalPos.x, finalPos.y, 5, 5);

    angle += 0.02; // Increment the angle for circular motion
}
