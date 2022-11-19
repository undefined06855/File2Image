const text = document.getElementById("text")
    , canvas = document.querySelector("canvas")
    , ctx = canvas.getContext("2d")

var bytes = [];

function update(arr)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (i in arr)
    {
        const byte = arr[i]
            , x = i % canvas.width
            , y = Math.floor(i / canvas.width)

            , order = document.getElementById("colorchoice").value

        // color should be r*65536 + g*256 + b
        // blue =  char // 256
        // green = char // 65536
        // red =   char // 16777215

        var r = 0
          , g = 0
          , b = 0

        switch(order)
        {
            case "r": r = byte; break;
            case "g": g = byte; break;
            case "b": b = byte; break;

            default:  r = byte
                      g = byte 
                      b = byte
        }


        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, 1, 1);
    }
}

document.getElementById("fileupload").addEventListener("change", () => {
    const f = document.getElementById("fileupload").files[0]
    if (!f) return false;

    console.log(f)
    if (f.size > 300000)
    {
        if (!confirm("Files over 300kb may be unstable. Try anyway?")) return false;
    }

    document.getElementById("filename").innerText = f.name

    var reader = new FileReader();
    reader.onload = function() {

        var arrayBuffer = this.result
        bytes = new Uint8Array(arrayBuffer)

        update(bytes)
    }
    reader.readAsArrayBuffer(f);
}, false);

document.getElementById("upload").addEventListener("click", () => document.getElementById("fileupload").click() )