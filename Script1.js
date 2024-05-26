let angle = 0;
let maxRadius = 795 / 2; // Maximum radius of the invisible circle
let radius = maxRadius;

function setup() {
    createCanvas(800, 800);
    background(0);
    noStroke();
    fill(255); // White color for the particle
}

function draw() {
    background(0); // Black background

    // Calculate the current radius
    radius = maxRadius * (1 - (frameCount % 600) / 600);

    let x = width / 2 + radius * cos(angle);
    let y = height / 2 + radius * sin(angle);

    ellipse(x, y, 5, 5); // Draw the particle

    angle += 0.02; // Increment the angle for circular motion
}
