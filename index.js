let x = y = 1, r = 0, q = 1.715;

let i = 0;
while (Math.abs(r - q) > .001 && i++ < 500) {
    if (r < q) x++;
    else y++;

    r = x / y;
}

console.log(x, y, r)