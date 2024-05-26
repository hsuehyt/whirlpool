let angle = 0;
let maxRadius = 795 / 2; // Maximum radius of the invisible circle
let radius = maxRadius;
let trailLength = 50; // Length of the ghosting trail
let trail = [];

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

    // Add the current position to the trail
    trail.push({ x, y });

    // Keep only the last 'trailLength' positions in the trail
    if (trail.length > trailLength) {
        trail.shift();
    }

    // Draw the particles along the trail
    for (let i = 0; i < trail.length; i++) {
        let pos = trail[i];
        let alpha = map(i, 0, trail.length, 50, 255); // Gradually reduce the alpha value
        fill(255, alpha);
        ellipse(pos.x, pos.y, 5, 5);
    }

    // Draw more particles along the previous positions to form a continuous trail
    for (let i = 0; i < trail.length - 1; i++) {
        let current = trail[i];
        let next = trail[i + 1];
        let distance = dist(current.x, current.y, next.x, next.y);
        let steps = distance / 5; // Calculate the number of particles needed to fill the gap

        for (let j = 0; j < steps; j++) {
            let intermediateX = lerp(current.x, next.x, j / steps);
            let intermediateY = lerp(current.y, next.y, j / steps);
            let alpha = map(i, 0, trail.length, 50, 255); // Gradually reduce the alpha value
            fill(255, alpha);
            ellipse(intermediateX, intermediateY, 5, 5);
        }
    }

    angle += 0.02; // Increment the angle for circular motion
}
