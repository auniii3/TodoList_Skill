function print(n){
    if(n==0 || n==1 || n==2){
        return 0;
    }
    if(n==3){
        return 1
    }
    else
    {
        return print(n-1)+print(n-2)+print(n-3);
    }
}

function printTri(n){
    var ans = 0;
    for(var i=0;i<n;i++){
        ans = ans+print(i) + " ";
    }
    console.log(ans);
}
printTri(6);

var i =0;
var sum =0;
while(i<100){
    sum = sum + i;
    sum = i + sum;
    i++;
}
console.log(sum);