/**
 * shuffle
 * @param {HTMLElement} $el
 * @param {Object} options
 * @return {void}
 */
function shuffle($el, options)
{
  // merge options
  options = Object.assign({}, {
    text: '', // 최종적으로 표시되는 텍스트
    waitChar: '-', // 변경되기 전에 표시되는 텍스트
    charSpeed: 1, // 한 번에 바뀌는 글자의 개수
    moveFix: 25, // 텍스트가 바뀌는 딜레이 시간
    moveRange: 10, // 랜덤으로 글자가 바뀌고 있을 때의 시간 관련
    moveTrigger: 25, // 랜덤으로 글자가 바뀌고 있을 때의 시간 관련
    fps: 60, // 초당 프레임 수
    pattern: 'abcdefghijklmnopqrstuvwxyz0123456789-_!@#$%^&*()+~<>', // random text pattern
    randomTextType: null, // unicode, pattern
    retry: true, // 함수가 실행할 때마다 텍스트가 새로 만들어진다.
    callback: null, // 애니메이션이 끝나고 실행되는 함수
  }, options)

  options.text = options.text.trim()

  // set values
  let textKeys = []
  let frame = 0
  let position = 0
  let currentText = ''
  let checkLast = true
  let checkPlay = false
  let lastTime = 0
  const fpsInterval = 1000 / options.fps

  /**
   * stack
   */
  function stack(currentTime)
  {
    const elapsed = currentTime - lastTime
    if (elapsed > fpsInterval)
    {
      lastTime = currentTime - (elapsed % fpsInterval)
      let str = currentText
      checkLast = true
      for (let tick = position; tick <= frame; tick++)
      {
        if (textKeys[tick] !== 0 && textKeys[tick] != null)
        {
          checkLast = false
          const selectKey = textKeys[tick]
          let txt = ''
          if (Math.abs(selectKey) <= options.moveTrigger)
          {
            switch (options.randomTextType)
            {
              case 'pattern':
                txt = randomWord(options.pattern)
                break
              case 'unicode':
              default:
                const unicode = Math.min(Math.max(options.text.charCodeAt(tick) + selectKey, 33), 126)
                txt = String.fromCharCode(unicode)
                break
            }
            str += txt
          }
          else
          {
            str += options.waitChar
          }
          selectKey > 0 ? textKeys[tick] -= 1 : textKeys[tick] += 1
        }
        else
        {
          if (position === tick - 1)
          {
            position = tick
            currentText = options.text.substring(0, position)
          }
          str += options.text.charAt(tick)
        }
      }
      // 한 번의 DOM 업데이트
      $el.textContent = str
      if (frame <= options.text.length)
      {
        frame += options.charSpeed
      }
      else
      {
        checkPlay = true
      }
      // last stack
      if (checkLast && checkPlay)
      {
        $el.dataset.id && cancelAnimationFrame(parseInt($el.dataset.id))
        $el.textContent = currentText
        $el.dataset.run = 'false'
        options.callback && options.callback()
        return
      }
    }
    $el.dataset.id = requestAnimationFrame(stack)
  }

  /**
   * get random word
   * 무작위 문자를 가져온다.
   * @param {string} pattern
   * @return {string}
   */
  function randomWord(pattern)
  {
    const n = Math.floor(Math.random() * pattern.length)
    return pattern.substring(n, n + 1)
  }

  // play
  if (options.text || (options.text && !options.retry && $el.dataset.run !== 'true'))
  {
    $el.dataset.run = 'true'
    $el.textContent = options.waitChar
    // set values
    for (let i = 0; i <= options.text.length - 1; i++)
    {
      if (options.text.charAt(i) !== ' ')
      {
        textKeys[i] = (options.moveFix + Math.round(Math.random() * options.moveRange)) * (Math.round(Math.random()) - .5) * 2
      }
      else
      {
        textKeys[i] = 0
      }
    }
    // reset values
    frame = 0
    position = 0
    currentText = ''
    // set requestAnimationFrame
    $el.dataset.id && cancelAnimationFrame(Number($el.dataset.id))
    $el.dataset.id = requestAnimationFrame(stack)
  }
}

export default shuffle
