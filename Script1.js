let angle = 0;
let radius = 795 / 2; // Radius of the invisible circle

function setup() {
    createCanvas(800, 800);
    background(0);
    noStroke();
    fill(255); // White color for the particle
}

function draw() {
    background(0); // Black background

    let x = width / 2 + radius * cos(angle);
    let y = height / 2 + radius * sin(angle);

    ellipse(x, y, 5, 5); // Draw the particle

    angle += 0.02; // Increment the angle for circular motion
}
