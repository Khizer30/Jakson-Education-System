let a = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "] ;
let b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"] ;

// In Words
function inWords (num: string): string
{
  if ((num = num.toString()).length > 9) return "overflow" ;
  let n: RegExpMatchArray | null = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/) ;
  if (!n) return "" ;
  
  let str: string = "" ;
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore " : "" ;
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh " : "" ;
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand " : "" ;
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred " : "" ;
  str += (n[5] != 0) ? ((str != "") ? "& " : "") + (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) : "" ;
  
  return str ;
}

// Export In Words
export default inWords ;