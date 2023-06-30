export default function formatter(payload: string | number) {
  const regex = /\B(?=(\d{3})+(?!\d))/g;

  if (typeof payload === "string" && payload !== '') {
    const parts = payload.split(" ");

    if(parts.length===1){
      const number = parts[0].replace(regex, ",");
      return `${number}`;
    }else{
      const number = parts[1].replace(regex, ",");
      return `${parts[0]} ${number}`;
    }
  } else if (typeof payload === "number") {
    return payload.toLocaleString();
  } else {
    return "";
  }
}
