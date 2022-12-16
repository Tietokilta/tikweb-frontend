/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef, useEffect, KeyboardEvent, useState } from "react"
import ErrorImage from "../assets/DinoGame/Error.svg"
import TaxiImage from "../assets/DinoGame/Taxi.svg"
import StandImage from "../assets/DinoGame/Stand.svg"
import WalkImage1 from "../assets/DinoGame/Walk1.svg"
import WalkImage2 from "../assets/DinoGame/Walk2.svg"
import RestartImage from "../assets/DinoGame/Restart.svg"

type Obstacle = {
  x: number
  y: number
  width: number
  height: number
  image: HTMLImageElement
}

type Point = {
  x: number
  y: number
}

class HitBox {
  width: number

  height: number

  bottomLeft: Point

  constructor(width: number, height: number, bottomLeft: Point) {
    this.width = width
    this.height = height
    this.bottomLeft = bottomLeft
  }

  get minX() {
    return this.bottomLeft.x
  }

  get minY() {
    return this.bottomLeft.y
  }

  get maxX() {
    return this.bottomLeft.x + this.width
  }

  get maxY() {
    return this.bottomLeft.y + this.height
  }

  isCollisionWith(other: HitBox) {
    const xCollide = this.minX <= other.maxX && this.maxX >= other.minX
    const yCollide = this.minY <= other.maxY && this.maxY >= other.minY
    return xCollide && yCollide
  }
}

const DinoGame = () => {
  const canvasRef = useRef(null)
  const jumpRef = useRef(false)
  const [isEnd, setIsEnd] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [restart, setRestart] = useState(false)

  const jump = () => {
    jumpRef.current = true
  }

  const doRestart = () => {
    setIsEnd(false)
    setRestart(!restart)
  }

  const doAction = () => {
    if (isEnd) {
      doRestart()
    } else {
      jump()
    }
    if (!isStarted) {
      setIsStarted(true)
    }
  }

  const handleClick = () => {
    doAction()
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    const isJumpButton =
      event.key === " " || event.key === "ArrowUp" || event.key === "w"
    if (isJumpButton) {
      doAction()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement // ඞ
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d")
    const obstacleTypes = [
      { targetHeight: 130, image: ErrorImage },
      { targetHeight: 75, image: TaxiImage },
    ]
    let animationFrameId: number
    let frameCount = 0
    let playerY = 0
    let playerYVelocity = 0
    let lastJumpPressFrame = 0
    const playerHeight = 120
    const groundHeight = 30
    const startObstacleMoveSpeed = 2.5
    let obstacleMoveSpeed = startObstacleMoveSpeed
    let currentRunTickCount = 0
    let gameHasEnded = false
    let currentObstacles: Obstacle[] = []
    let groundSpecs: Point[] = []
    const createSpec = (x?: number): Point => {
      return {
        x: x || canvas.width,
        y: Math.random() * groundHeight,
      }
    }
    for (let i = 0; i <= canvas.width; i += 1) {
      const everyFourth = i % 4 === 0
      if (everyFourth) {
        groundSpecs.push(createSpec(i))
      }
    }

    const drawGround = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "black"
      ctx.fillRect(0, ctx.canvas.height - groundHeight, ctx.canvas.width, 2)
      groundSpecs.forEach((spec) => {
        ctx.fillRect(spec.x, canvas.height - spec.y, 1, 1)
      })
    }

    const getScaledImageDimensions = (
      image: HTMLImageElement,
      targetHeight: number
    ) => {
      const multiplier = targetHeight / image.height
      const scaledWidth = image.width * multiplier
      const scaledHeight = image.height * multiplier
      return { scaledWidth, scaledHeight }
    }

    const drawPlayerAndReturnHitbox = (ctx: CanvasRenderingContext2D) => {
      const distanceFromBottom = 10
      const playerDrawY =
        ctx.canvas.height - playerHeight - playerY - distanceFromBottom
      const image = new Image()
      const animationSlowMult = 3 * (2.5 / obstacleMoveSpeed)
      const picIndex = Math.floor(
        (currentRunTickCount % (40 * animationSlowMult)) /
          (10 * animationSlowMult)
      )
      const pictureIfOnGround = [
        StandImage,
        WalkImage1,
        StandImage,
        WalkImage2,
      ][picIndex]
      const pictureIfInAir = StandImage
      const playerPicture = playerY === 0 ? pictureIfOnGround : pictureIfInAir
      image.src = playerPicture
      const { scaledWidth, scaledHeight } = getScaledImageDimensions(
        image,
        playerHeight
      )
      let playerX = 50
      const isStandPicture = playerPicture === StandImage
      if (isStandPicture) {
        playerX += scaledWidth / 4 // Animation looks better with offset
      }
      ctx.drawImage(image, playerX, playerDrawY, scaledWidth, scaledHeight)
      const playerHitBox = new HitBox(scaledWidth, scaledHeight, {
        x: 50,
        y: playerDrawY,
      })
      return playerHitBox
    }

    const drawObstaclesAndDetectCollisions = (
      ctx: CanvasRenderingContext2D,
      playerHitBox: HitBox
    ) => {
      currentObstacles.forEach((obstacle) => {
        const obstacleY = ctx.canvas.height - obstacle.y
        const hitBox = new HitBox(obstacle.width, obstacle.height, {
          x: obstacle.x,
          y: obstacleY,
        })
        if (hitBox.isCollisionWith(playerHitBox)) {
          if (!gameHasEnded) {
            setIsEnd(true)
            gameHasEnded = true
          }
        }
        ctx.drawImage(
          obstacle.image,
          obstacle.x,
          obstacleY,
          obstacle.width,
          obstacle.height
        )
      })
    }

    const drawScoreText = (ctx: CanvasRenderingContext2D) => {
      const score = currentRunTickCount / 30
      ctx.fillStyle = "black"
      ctx.font = "40px VT323"
      const digits = 5
      const scoreText = score.toFixed(0)
      const zeroes = "0".repeat(digits - scoreText.length)
      const scoreTextWithZeroes = zeroes + scoreText
      ctx.fillText(scoreTextWithZeroes, ctx.canvas.width - 100, 40)
    }

    const drawGameOverText = (ctx: CanvasRenderingContext2D) => {
      const gameOverText = "GAME OVER"
      ctx.font = "40px VT323"
      ctx.fillText(
        gameOverText,
        ctx.canvas.width / 2 - ctx.measureText(gameOverText).width / 2,
        100
      )
    }

    const draw = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      drawGround(ctx)
      const playerHitBox = drawPlayerAndReturnHitbox(ctx)
      drawObstaclesAndDetectCollisions(ctx, playerHitBox)
      drawScoreText(ctx)
      if (gameHasEnded) {
        drawGameOverText(ctx)
      }
    }

    const createObstacle = (): Obstacle => {
      const obstacleType =
        obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)]
      const image = new Image()
      image.src = obstacleType.image
      const { scaledWidth, scaledHeight } = getScaledImageDimensions(
        image,
        obstacleType.targetHeight
      )
      const minDistanceFromScreenEdge = 250
      const distanceVariation = 100
      const minDistanceFromGroundLine = 5
      return {
        x:
          canvas.width +
          Math.random() * distanceVariation +
          minDistanceFromScreenEdge,
        y:
          scaledHeight +
          Math.random() * (groundHeight - minDistanceFromGroundLine),
        width: scaledWidth,
        height: scaledHeight,
        image,
      }
    }

    const updateObstacleMoveSpeed = () => {
      const newObstacleMoveSpeed =
        startObstacleMoveSpeed + currentRunTickCount / 2000
      const maxObstacleMoveSpeed = 5.5
      obstacleMoveSpeed = Math.min(newObstacleMoveSpeed, maxObstacleMoveSpeed)
    }

    const setLastJumpFrame = () => {
      const isJumping = jumpRef.current
      if (isJumping) {
        lastJumpPressFrame = frameCount
        jumpRef.current = false
      }
    }

    const possiblyJump = () => {
      const isShortTimeSinceLastTimeJumped =
        frameCount - lastJumpPressFrame < 30
      const playerIsOnGround = playerY === 0
      const shouldJump = isShortTimeSinceLastTimeJumped && playerIsOnGround
      if (shouldJump) {
        playerYVelocity = 5
      }
    }

    const accelerateDown = () => {
      const notYetMaxDropSpeed = playerYVelocity > -10
      if (notYetMaxDropSpeed) {
        playerYVelocity -= 0.07
      }
    }

    const stopIfPlayerIsOnGround = () => {
      const playerIsOnGroundOrBelow = playerY <= 0
      if (playerIsOnGroundOrBelow) {
        playerY = 0
        playerYVelocity = 0
      }
    }

    const moveGroundSpecsAndRemoveOldOnes = () => {
      groundSpecs = groundSpecs
        .map((spec) => {
          return { ...spec, x: spec.x - obstacleMoveSpeed }
        })
        .filter((spec) => spec.x > -1000)
    }

    const moveObstaclesAndRemoveOldOnes = () => {
      currentObstacles = currentObstacles
        .map((obstacle) => {
          return { ...obstacle, x: obstacle.x - obstacleMoveSpeed }
        })
        .filter((obstacle) => obstacle.x > -1000)
    }

    const possiblyCreateNewObstacle = () => {
      const noObstacles = currentObstacles.length === 0
      const lastObstacle = currentObstacles[currentObstacles.length - 1]
      const lastObstacleIsFarEnoughAway = lastObstacle?.x < canvas.width - 500
      if (noObstacles || lastObstacleIsFarEnoughAway) {
        currentObstacles = [...currentObstacles, createObstacle()]
      }
    }

    const render = () => {
      if (context) {
        draw(context)
      }
      const gameIsRunning = !gameHasEnded && isStarted
      if (gameIsRunning) {
        currentRunTickCount += 1
        updateObstacleMoveSpeed()
        setLastJumpFrame()
        possiblyJump()
        accelerateDown()
        playerY += playerYVelocity
        moveObstaclesAndRemoveOldOnes()
        possiblyCreateNewObstacle()
        stopIfPlayerIsOnGround()
        moveGroundSpecsAndRemoveOldOnes()
        groundSpecs = [...groundSpecs, createSpec()]
      }
      frameCount += 1
      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [restart, isStarted])

  return (
    <div className="w-full flex justify-center py-10 px-2">
      <div
        onClick={handleClick}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        className="relative border-2 border-black w-full md:w-1/2"
      >
        <canvas ref={canvasRef} height="310" width="750" className="w-full" />
        {isEnd && (
          <button
            type="button"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none w-1/12 h-1/12 bg-none z-10 cursor-pointer"
          >
            <img src={RestartImage} alt="Restart" />
          </button>
        )}
      </div>
    </div>
  )
}

export default DinoGame
