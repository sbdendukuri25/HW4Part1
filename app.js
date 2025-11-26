/* 
  HW4 Part 1 — jQuery Validation Edition of HW3 Table Generator
  Author: Sri Bhargava Dendukuri
  Email: SriBhargava_Dendukuri@student.uml.edu
  Course: COMP 4610 - GUI Programming
  This implementation uses the official jQuery Validation plugin:
  https://jqueryvalidation.org/
*/

$(function(){

  const LIMIT = 50;
  const SAFE_MAX = 15000;

  $("#hw4-form").validate({
    rules:{
      hStart:{required:true, number:true, min:-LIMIT, max:LIMIT},
      hEnd:{required:true, number:true, min:-LIMIT, max:LIMIT},
      vStart:{required:true, number:true, min:-LIMIT, max:LIMIT},
      vEnd:{required:true, number:true, min:-LIMIT, max:LIMIT}
    },
    messages:{
      hStart:"Must be a whole number between -50 and 50.",
      hEnd:"Must be within -50 to 50. Swap values if reversed.",
      vStart:"Enter an integer between -50 and 50.",
      vEnd:"Enter an integer between -50 and 50."
    },
    errorPlacement:(err,element)=> err.insertAfter(element),

    submitHandler:function(){
      clearStatus();

      const hs = parseInt($("#hStart").val());
      const he = parseInt($("#hEnd").val());
      const vs = parseInt($("#vStart").val());
      const ve = parseInt($("#vEnd").val());

      const h1 = Math.min(hs,he), h2 = Math.max(hs,he);
      const v1 = Math.min(vs,ve), v2 = Math.max(vs,ve);

      const rows = v2-v1+1, cols = h2-h1+1;
      if(rows*cols > SAFE_MAX){
        $("#errMsg").text("Table too large. Reduce numeric range.");
        return;
      }

      buildTable(h1,h2,v1,v2);
      $("#okMsg").text(`Built ${rows}×${cols} table successfully.`);
    }
  });

  $("#resetBtn").click(()=>{
    $("#hw4-form")[0].reset();
    $("#hw4-form").validate().resetForm();
    $("#grid thead").empty(); $("#grid tbody").empty();
    $("#okMsg").text(""); $("#errMsg").text("");
  });
});


// ----------------- Build Table (unchanged logic) -----------------
function buildTable(h1,h2,v1,v2){
  const thead=$("#grid thead").empty();
  const tbody=$("#grid tbody").empty();

  let head="<tr><th class='corner'>×</th>";
  for(let h=h1;h<=h2;h++) head+=`<th>${h}</th>`;
  thead.append(head+"</tr>");

  for(let v=v1;v<=v2;v++){
    let row=`<tr><th>${v}</th>`;
    for(let h=h1;h<=h2;h++) row+=`<td>${h*v}</td>`;
    tbody.append(row+"</tr>");
  }
}

function clearStatus(){
  $("#okMsg").text(""); $("#errMsg").text("");
}
