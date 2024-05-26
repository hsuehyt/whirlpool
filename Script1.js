let particles = [];
let maxParticles = 5;

function setup() {
    createCanvas(800, 800);
    noStroke();
    fill(255); // White color for the particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    // Draw a semi-transparent black rectangle to create a fading trail effect
    fill(0, 20); // Adjust the second parameter to change the trail length
    rect(0, 0, width, height);

    // Update and display all particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        if (particles[i].radius <= 0) {
            particles.splice(i, 1); // Remove the particle if its radius is 0 or below
            if (particles.length < maxParticles) {
                particles.push(new Particle()); // Add a new particle if there are less than maxParticles
            }
        }
    }
}

class Particle {
    constructor() {
        this.trailLength = 50; // Length of the ghosting trail
        this.startNewCycle();
        this.trail = [];
        this.previousRadius = this.radius;
    }

    startNewCycle() {
        this.maxRadius = random(5, 795);
        this.radius = this.maxRadius;
        this.previousRadius = this.maxRadius;
        this.scalingSpeed = this.maxRadius / 200; // Adjust this value to control the speed of scaling down
        this.angle = random(TWO_PI); // Set the starting angle to a random value between 0 and TWO_PI
        this.trail = [];
        this.startTime = millis();
        this.delay = random(1000, 5000); // Random delay between 1 and 5 seconds
    }

    update() {
        // Only update the particle after its delay has passed
        if (millis() - this.startTime < this.delay) {
            return;
        }

        // Update the radius based on the scaling speed
        this.radius -= this.scalingSpeed;

        // Clear the trail if the radius resets to maximum
        if (this.radius > this.previousRadius) {
            this.trail = [];
        }

        this.previousRadius = this.radius;

        let x = width / 2 + this.radius * cos(this.angle);
        let y = height / 2 + this.radius * sin(this.angle);

        // Add the current position to the trail
        this.trail.push({ x, y });

        // Keep only the last 'trailLength' positions in the trail
        if (this.trail.length > this.trailLength) {
            this.trail.shift();
        }

        this.angle += 0.02; // Increment the angle for circular motion
    }

    display() {
        // Only display the particle after its delay has passed
        if (millis() - this.startTime < this.delay) {
            return;
        }

        // Draw the particles along the trail
        for (let i = 0; i < this.trail.length - 1; i++) {
            let pos = this.trail[i];
            let nextPos = this.trail[i + 1];
            let alpha = map(i, 0, this.trail.length - 1, 50, 255); // Gradually increase the alpha value
            let size = map(i, 0, this.trail.length - 1, 1, 5); // Gradually increase the size of the particles
            fill(255, alpha);

            let numSteps = dist(pos.x, pos.y, nextPos.x, pos.y) / 2.5; // Adjust the step size to ensure no gaps
            for (let j = 0; j < numSteps; j++) {
                let interX = lerp(pos.x, nextPos.x, j / numSteps);
                let interY = lerp(pos.y, nextPos.y, j / numSteps);
                ellipse(interX, interY, size, size);
            }
        }

        // Ensure the final particle in the trail is drawn
        if (this.trail.length > 0) {
            let finalPos = this.trail[this.trail.length - 1];
            fill(255, 50);
            ellipse(finalPos.x, finalPos.y, 5, 5); // Largest size for the newest particle
        }
    }
}
