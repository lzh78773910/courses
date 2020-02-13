export function sortNumbers(a,b) {
  return a-b
}

//计算排序 降序
export function sortByKey(array,key){
  return array.sort(function(b,a){
      var x = a[key];
      var y = b[key];
      return((x<y)?-1:((x>y)?1:0));
  })
}

