<template>

    <div class="checkBox">
        <label class="amazingCheckBox"><input ref="checkbox" type="checkbox" v-on:change="partyPop(this)"><slot></slot></label>
    </div>

</template>

<script>
    export default {
        name: "checkBox",
        methods: {
            partyPop() {
                let input = this.$refs["checkbox"],
                    label = input.closest("label");

                if (input && label) {
                    // do the effect
                    if (input.checked) {
                        let particles = 14;
                        for (let p = 0; p < particles; ++p) {
                            let angleInc = 360 / particles,
                                angle = angleInc * p;

                            if (p % 2 === 1)
                                angle -= angleInc / 2;

                            this.confetti(label, angle);
                        }
                    } else {
                        // cut the effect short if running
                        while (label.querySelector("span"))
                            label.removeChild(label.lastChild);
                    }
                }
            },

            confetti(el, angle, hue) {
                var hue = hue || 0;
                let particle = document.createElement("span"),
                    start = 0.75,
                    end = 2.25,
                    middle = (start + end) / 2,
                    angleInRad = angle * Math.PI / 180,
                    angleSin = Math.sin(angleInRad),
                    angleCos = Math.cos(angleInRad),
                    pointA = {
                        x: start * angleSin,
                        y: start * angleCos
                    },
                    pointB = {
                        x: middle * angleSin,
                        y: middle * angleCos
                    },
                    pointC = {
                        x: end * angleSin,
                        y: end * angleCos
                    },
                    rootEl = document.querySelector(":root"),
                    durationInMs = this.propertyUnitsStripped(rootEl, "--duration", "s") * 1e3,
                    animation = particle.animate([
                        {
                            transform: "translate(" + pointA.x + "em," + pointA.y + "em) scale(0)"
                        },
                        {
                            transform: "translate(" + pointB.x + "em," + pointB.y + "em) scale(1)"
                        },
                        {
                            transform: "translate(" + pointC.x + "em," + pointC.y + "em) scale(0)"
                        }
                    ], {
                        duration: durationInMs * 0.75,
                        easing: "linear",
                        delay: durationInMs * 0.25
                    }),
                    bgHue = Math.round(angle);
                // color the particle
                particle.style.background = "hsl(" + bgHue + ",90%,45%)";
                // spawn the particle
                el.appendChild(particle);
                animation.onfinish = particle.remove.bind(particle);
            },

            propertyUnitsStripped(el, property, unit) {
                let cs = window.getComputedStyle(el),
                    valueRaw = cs.getPropertyValue(property),
                    value = +valueRaw.substr(0, valueRaw.indexOf(unit));

                return value;
            }
        },

        mounted () {
            // if (document.body.animate) {
            //     this.partyPop(this.$refs["checkbox"]);
            // }
        }
    }
</script>

<style>

    /*--------amazing checkbox&&radio------*/

    :root {
        --bg: #e3e4e8;
        --fg: #17181c;
        --inputBg: #ffffff;
        --inputBgDown: #e3e4e8;
        --inputBorder: #c7cad1;
        --inputBorderDown: #c7cad1;
        --primary: #255ff4;
        --primaryDown: #5583f6;
        --duration: 0.5s;
        font-size: calc(20px + (30 - 20) * (100vw - 320px) / (1280 - 320));
    }

    .amazingCheckBox input {
        font: 1em/1.5 Hind, sans-serif;
    }

    .amazingCheckBox {
        display: flex;
        font-size: 0.7em;
    }

    .amazingCheckBox, .amazingCheckBox input {
        cursor: pointer;
    }

    .amazingCheckBox input {
        margin-right: 0.5em;
        width: 1.5em;
        height: 1.5em;
        -webkit-appearance: none;
        appearance: none;
    }

    .amazingCheckBox input:focus {
        outline: transparent;
    }

    .amazingCheckBox input[type=checkbox], .amazingCheckBox input[type=checkbox]:after, .amazingCheckBox input[type=radio] {
        transition: all 0.1s linear;
    }

    .amazingCheckBox input[type=checkbox] {
        background: var(--inputBg);
        border-radius: 0.25em;
        box-shadow: 0 0 0 0.1em var(--inputBorder) inset;
    }

    .amazingCheckBox input[type=checkbox]:after {
        color: #255ff4;
        content: "\2713";
        display: block;
        font-size: 1.5em;
        line-height: 1;
        text-align: center;
        transform: scale(0);
        transform-origin: 50% 67%;
        width: 100%;
        height: 100%;
    }

    .amazingCheckBox input[type=checkbox]:checked {
        animation: popOutCheckbox var(--duration) linear;
    }

    .amazingCheckBox input[type=checkbox]:checked:after {
        transform: scale(1);
        transition: background 0.1s linear,
        color 0.1s linear,
        transform calc(var(--duration) / 5) calc(var(--duration) / 2) linear;
    }

    .amazingCheckBox input[type=checkbox]:active, .amazingCheckBox input[type=checkbox]:focus {
        background: var(--inputBgDown);
        box-shadow: 0 0 0 0.1em var(--inputBorderDown) inset;
    }

    .amazingCheckBox input[type=checkbox]:active:after, .amazingCheckBox input[type=checkbox]:focus:after {
        color: var(--primaryDown);
    }

    .amazingCheckBox input[type=radio] {
        background: var(--primary);
        border-radius: 50%;
        box-shadow: 0 0 0 0.1em var(--inputBorder) inset,
        0 0 0 0.76em var(--inputBg) inset;
    }

    .amazingCheckBox input[type=radio]:checked {
        animation: popOutRadio var(--duration) linear;
        box-shadow: 0 0 0 0.1em var(--inputBorder) inset,
        0 0 0 0.375em var(--inputBg) inset;
    }

    .amazingCheckBox input[type=radio]:active, .amazingCheckBox input[type=radio]:focus {
        background: var(--primaryDown);
        box-shadow: 0 0 0 0.1em var(--inputBorderDown) inset,
        0 0 0 0.76em var(--inputBgDown) inset;
    }

    .amazingCheckBox input[type=radio]:checked:active, .amazingCheckBox input[type=radio]:checked:focus {
        box-shadow: 0 0 0 0.1em var(--inputBorderDown) inset,
        0 0 0 0.375em var(--inputBgDown) inset;
    }

    .amazingCheckBox {
        align-items: center;
        position: relative;
        -webkit-tap-highlight-color: transparent;
    }

    .amazingCheckBox span {
        border-radius: 50%;
        display: block;
        pointer-events: none;
        position: absolute;
        top: 0.5em;
        left: 0.5em;
        width: 0.5em;
        height: 0.5em;
        transform: scale(0);
    }

    .amazingCheckBox span:nth-of-type(even) {
        top: 0.625em;
        left: 0.625em;
        width: 0.25em;
        height: 0.25em;
    }

    /* Animations */
    @keyframes popOutCheckbox {
        from {
            background: transparent;
            border-radius: 50%;
            box-shadow: 0 0 0 0.375em var(--primary),
            0 0 0 0.76em var(--primary) inset;
            transform: scale(0);
        }
        25% {
            background: transparent;
            border-radius: 50%;
            box-shadow: 0 0 0 0.375em #db0bdb,
            0 0 0 0.375em #db0bdb inset;
            transform: scale(1);
        }
        50% {
            background: transparent;
            border-radius: 50%;
            box-shadow: 0 0 0 0 #db0b0b,
            0 0 0 0 #db0b0b inset;
            transform: scale(1);
        }
        50.1% {
            background: var(--inputBg);
            border-radius: 0.25em;
            box-shadow: 0 0 0 0 var(--primary),
            0 0 0 0.1em var(--inputBorder) inset;
            transform: scale(0);
        }
        75% {
            background: var(--inputBg);
            border-radius: 0.25em;
            box-shadow: 0 0 0 0 var(--primary),
            0 0 0 0.1em var(--inputBorder) inset;
            transform: scale(1.1);
        }
        87.5% {
            background: var(--inputBg);
            border-radius: 0.25em;
            box-shadow: 0 0 0 0 var(--primary),
            0 0 0 0.1em var(--inputBorder) inset;
            transform: scale(0.95);
        }
        to {
            background: var(--inputBg);
            border-radius: 0.25em;
            box-shadow: 0 0 0 0 var(--primary),
            0 0 0 0.1em var(--inputBorder) inset;
            transform: scale(1);
        }
    }

    @keyframes popOutRadio {
        from {
            background: transparent;
            box-shadow: 0 0 0 0.375em var(--primary),
            0 0 0 0.76em var(--primary) inset;
            transform: scale(0);
        }
        25% {
            background: transparent;
            box-shadow: 0 0 0 0.375em #db0bdb,
            0 0 0 0.76em #db0bdb inset;
            transform: scale(1);
        }
        50% {
            background: transparent;
            box-shadow: 0 0 0 0 #db0b0b,
            0 0 0 0 #db0b0b inset;
            transform: scale(1);
        }
        50.1% {
            background: var(--primary);
            box-shadow: 0 0 0 0.1em var(--inputBorder) inset,
            0 0 0 0.375em var(--inputBg) inset;
            transform: scale(0);
        }
        75% {
            background: var(--primary);
            box-shadow: 0 0 0 0.1em var(--inputBorder) inset,
            0 0 0 0.375em var(--inputBg) inset;
            transform: scale(1.2);
        }
        87.5% {
            background: var(--primary);
            box-shadow: 0 0 0 0.1em var(--inputBorder) inset,
            0 0 0 0.375em var(--inputBg) inset;
            transform: scale(0.9);
        }
        to {
            background: var(--primary);
            box-shadow: 0 0 0 0.1em var(--inputBorder) inset,
            0 0 0 0.375em var(--inputBg) inset;
            transform: scale(1);
        }
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
        :root {
            --bg: #17181c;
            --fg: #e3e4e8;
            --inputBg: #2e3138;
            --inputBgDown: #454954;
            --inputBorder: #2e3138;
            --inputBorderDown: #454954;
        }
    }


</style>
