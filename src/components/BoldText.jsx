// Easily enhanced to pass a className instead of <strong> and style with CSS. I didn't do it because of YAGN

const BoldText = ({text, match}) => {

    function createMarkup() {
      let regex = new RegExp(match, 'ig')
      let newText = text.replace(regex, `<strong>$&</strong>`)
      return {__html: newText};
    }
    
    return (
      <div
        dangerouslySetInnerHTML={createMarkup()}
        data-testid="boldText-testId"
      />
    )
  }

  export default BoldText;