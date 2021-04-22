import React from "react";

function ImagesList(props) {
  const { images, onClickHandler } = props;
  return (
    <div className="row center images-list">
      {images && images.map( (v, k) => <img key={k} className="small" src={v.url} onClick={()=> onClickHandler(v)} alt={v.name} />   )}
    </div>
  );
}

export default ImagesList;
