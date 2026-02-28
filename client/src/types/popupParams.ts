export type popupParam = {
  isActive : boolean,
  title : string,
  message : string,
  open : (title:string,message:string) => void,
  close : () => void
}