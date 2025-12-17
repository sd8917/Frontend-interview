
const DelegationExample = () => {

const handleClick = (e: any) =>{
     if (e.target.tagName === "BUTTON") {
      console.log(e.target.dataset.id);
    }
}
  return (
    <div onClick={handleClick}>
      <button data-id="1">Item 1</button>
      <button data-id="2">Item 2</button>
      <button data-id="3">Item 3</button>
    </div>
  )
}

export default DelegationExample
