import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef, range} from "@motion-canvas/core/lib/utils";
import {all, chain, sequence} from "@motion-canvas/core/lib/flow";
import {Img, Knot, Node, Rect, Spline, Txt} from "@motion-canvas/2d/lib/components";
import {SmoothSpring, spring} from "@motion-canvas/core/lib/tweening";
import {createSignal} from "@motion-canvas/core/lib/signals";
import enomicsFont from "../../../images/cpc/EnomicsFont.jpg";

export default makeScene2D(function* (view) {

    const bgRadius = 70;
    const bg = "white"
    view.fill(bg)
    const enomicsColor = "rgb(0, 187, 255)"
    const logoLength = 500;

    const bgRef = createRef<Rect>()

    view.add(
        <Rect fill={"black"} width={() => view.width()} height={() => view.height()}>

            <Rect ref={bgRef} fill={bg} radius={bgRadius} smoothCorners
                  width={() => view.width()} height={() => view.height()}>
            </Rect>
        </Rect>
    )

    yield* beginSlide("START")

    const firstLetter = createRef<Txt>()
    const secondLetter = createRef<Txt>()
    const thirdLetter = createRef<Txt>()

    const firstText = createRef<Txt>()
    const secondText = createRef<Txt>()
    const ampersandText = createRef<Txt>()
    const thirdText = createRef<Txt>()

    const borderLength = createSignal(0)
    const bottomSpline = createRef<Spline>()
    const topSpline = createRef<Spline>()

    const enomics = createRef<Node>()

    view.add(
        <>
            {/*<Txt fill={"orange"} text={"CPC"}*/}
            {/*     fontSize={700} fontFamily={"Open Sans"}/>*/}

            <Txt fill={"white"} shadowBlur={120} shadowColor={enomicsColor} ref={firstLetter} text={"L"} x={-435}
                 fontSize={700} fontFamily={"Space Grotesk"}/>
            <Txt fill={"white"} shadowBlur={120} shadowColor={enomicsColor} ref={secondLetter} text={"K"} fontSize={700}
                 fontFamily={"Space Grotesk"}/>
            <Txt fill={"white"} shadowBlur={120} shadowColor={enomicsColor} ref={thirdLetter} text={"S"} x={435}
                 fontSize={700} fontFamily={"Space Grotesk"}/>

            <Txt ref={firstText} y={-250} x={-200} fontSize={90} fontFamily={"Space Grotesk"}/>
            <Txt ref={secondText} fontSize={90} fontFamily={"Space Grotesk"}/>
            <Txt ref={thirdText} y={320} x={200} fontSize={90} fontFamily={"Space Grotesk"}/>
            <Txt ref={ampersandText} fill={enomicsColor} shadowColor={enomicsColor} shadowBlur={5} fontSize={0}
                 x={550} y={100} fontFamily={"Space Grotesk"}/>


            <Rect shadowColor={"black"} shadowBlur={50} height={view.height()} width={() => borderLength()}
                  fill={"black"} rotation={30} y={-view.height()}/>
            <Rect shadowColor={"black"} shadowBlur={50} height={view.height()} width={() => borderLength()}
                  fill={"black"} rotation={30} y={view.height()}/>

            <Txt zIndex={100} fill={"white"} fontFamily={"Space Grotesk"} text={"Presentiert von Neudorfer Niklas"}
                 x={view.width() / -2 + 410}
                 y={view.height() / 2 - 220}/>


            <Spline ref={topSpline} lineWidth={400} stroke={enomicsColor} lineJoin={'round'} end={0}
                    shadowBlur={50} shadowColor={enomicsColor}
                    rotation={30} x={-100} y={-view.height() / 2 - 100}>
                {range(15).map(value => {
                    return (
                        <Knot position={[value * 200, Math.sin(value) * 100]}></Knot>
                    )
                })
                }
            </Spline>,

            <Spline ref={bottomSpline} lineWidth={400} stroke={enomicsColor} lineJoin={'round'} end={1} start={1}
                    shadowBlur={50} shadowColor={enomicsColor}
                    rotation={30} x={() => -view.width() - 500} y={view.height() * -0.55 - 120}>
                {range(15).map(value => {
                    return (
                        <Knot position={[value * 200, Math.sin(value) * 100]}></Knot>
                    )
                })
                }
            </Spline>,

            <Txt zIndex={100} fill={"white"} fontFamily={"Space Grotesk"} text={"In Kooperation mit"}
                 x={view.width() / 2 - 800}
                 y={-420}/>

            <Node ref={enomics} opacity={0} scale={0.4} x={view.width() / 2 - 600} y={-300}>
                <Img src={enomicsFont} scale={10.2} opacity={0}/>

                {/*<Txt x={-420} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"} text={"EN"}></Txt>*/}

                <Txt x={-573} fill={"white"} y={30} fontSize={390} fontFamily={"Open Sans"}
                     text={"E"}></Txt>
                <Txt x={-310} fill={"white"} y={30} fontSize={390} fontFamily={"Open Sans"}
                     text={"N"}></Txt>


                {/*<Txt x={630} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"} text={"MICS"}></Txt>*/}

                <Txt x={340} fill={"white"} y={30} fontSize={390} fontFamily={"Open Sans"}
                     text={"M"}></Txt>
                <Txt x={579} fill={"white"} y={30} fontSize={390} fontFamily={"Open Sans"}
                     text={"I"}></Txt>
                <Txt x={760} fill={"white"} y={30} fontSize={390} fontFamily={"Open Sans"}
                     text={"C"}></Txt>
                <Txt x={992} fill={"white"} y={30} fontSize={390} fontFamily={"Open Sans"}
                     text={"S"}></Txt>


                <Rect zIndex={-100} height={logoLength} width={logoLength}
                      fill={"white"}
                      scale={0.57}
                    // opacity={1}
                    // x={-410}
                      radius={130}
                      smoothCorners>

                    <Rect height={logoLength} width={logoLength}
                          fill={enomicsColor}
                          scale={0.71}
                          opacity={1}
                          clip
                          radius={90}
                          smoothCorners>
                    </Rect>

                    <Rect height={50}
                          width={logoLength + 20}
                          fill={enomicsColor}/>

                    <Rect rotation={90} height={50}
                          width={logoLength + 20}
                          fill={enomicsColor}/>
                </Rect>
            </Node>
        </>
    )


    yield* chain(
        all(
            firstLetter().scale(0, 0),
            secondLetter().scale(0, 0),
            thirdLetter().scale(0, 0),
        ),
        sequence(
            0.1,
            spring(SmoothSpring, 0, 100, value => {
                firstLetter().scale(value / 100);
            }),
            spring(SmoothSpring, 0, 100, value => {
                secondLetter().scale(value / 100);
            }),
            spring(SmoothSpring, 0, 100, value => {
                thirdLetter().scale(value / 100);
            }),
        )
    )

    yield* sequence(
        0.3,
        all(
            firstLetter().position.y(-250, 1),
            secondLetter().position.y(0, 0),
            thirdLetter().position.y(300, 1),
            firstLetter().fontSize(320, 1),
            secondLetter().fontSize(320, 1),
            thirdLetter().fontSize(320, 1),

            firstLetter().position.x(-820, 1),
            secondLetter().position.x(-300, 1),
            thirdLetter().position.x(0, 1),
        ),
        all(
            firstText().position.x(-500, 1),
            secondText().position.x(100, 1),
            thirdText().position.x(520, 1),
        ),
        all(
            firstLetter().fill(enomicsColor, 1),
            secondLetter().fill(enomicsColor, 1),
            thirdLetter().fill(enomicsColor, 1),

            firstLetter().shadowBlur(10, 1),
            secondLetter().shadowBlur(10, 1),
            thirdLetter().shadowBlur(10, 1),

            //borderLength(view.width() * 2, 2),
            topSpline().end(1, 2),
            bottomSpline().start(0, 2),
            enomics().opacity(1, 3)
        ),
        sequence(
            0.1,
            //Ladestation
            // Konfigurations-
            // und Steuerungswerkzeug
            firstText().text("adestation", 1),
            secondText().text("onfigurations-", 1),
            ampersandText().fontSize(150, 1),
            ampersandText().text("&", 1),
            thirdText().text("teuerungswerkzeug", 1),
        )
    )

    yield* beginSlide("End Title ")

    yield* all(
        // topSpline().start(1, 2),
        // bottomSpline().end(0, 2),
        bgRef().radius([bgRadius, bgRadius, 0, 0], 1)
    )

});
