let particleSystems = [];
let maxSystems = 5;

function setup() {
    createCanvas(800, 800);
    noStroke();
    fill(255); // White color for the particles
    for (let i = 0; i < maxSystems; i++) {
        particleSystems.push(new ParticleSystem());
    }
}

function draw() {
    // Draw a semi-transparent black rectangle to create a fading trail effect
    fill(0, 20); // Adjust the second parameter to change the trail length
    rect(0, 0, width, height);

    // Update and display all particle systems
    for (let i = particleSystems.length - 1; i >= 0; i--) {
        particleSystems[i].update();
        particleSystems[i].display();
        if (particleSystems[i].isFinished()) {
            particleSystems.splice(i, 1); // Remove the system if it is finished
            if (particleSystems.length < maxSystems) {
                particleSystems.push(new ParticleSystem()); // Add a new system if there are less than maxSystems
            }
        }
    }
}

class ParticleSystem {
    constructor() {
        this.trailLength = 50; // Length of the ghosting trail
        this.startNewCycle();
        this.trail = [];
        this.previousRadius = this.radius;
    }

    startNewCycle() {
        this.maxDiameter = random(20, 795); // Random start diameter between 20 and 795
        this.radius = this.maxDiameter / 2;
        this.previousRadius = this.radius;
        this.angle = random(TWO_PI); // Set the starting angle to a random value between 0 and TWO_PI
        this.trail = [];
        this.startTime = millis();
        this.delay = random(1000, 5000); // Random delay between 1 and 5 seconds
    }

    update() {
        // Only update the particle system after its delay has passed
        if (millis() - this.startTime < this.delay) {
            return;
        }

        if (this.radius > 10) {
            // Adjust the scaling speed to slow down as the diameter approaches 20
            let scalingSpeed = map(this.radius, 10, this.previousRadius, 0.05, (this.previousRadius - 10) / 200);
            this.radius -= scalingSpeed;
        } else {
            this.radius = 10; // Maintain the minimum radius
            this.finished = true; // Mark the system as finished
        }

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
        // Only display the particle system after its delay has passed
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

            let numSteps = dist(pos.x, pos.y, nextPos.x, nextPos.y) / 2.5; // Adjust the step size to ensure no gaps
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

    isFinished() {
        // Check if the system has finished
        return this.finished;
    }
}
