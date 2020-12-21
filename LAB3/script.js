
class Student
{
	_Name = "Student";
	_Surname = "Student";
	_Age = 18;
	_AvgGrade = 0;
    setName(value)
	{
        if(value == null){
            throw new Error("Вы не ввели параметр \"Имя\" ");
        }
        if (typeof value != "string" ) {
            throw new TypeError("Параметр \"Имя\" введён неверно ");
        }
		this._Name = value;
	}
	setSurname(value)
	{
        if(value == null){
            throw new Error("Вы не ввели параметр \"Фамилия\" ");
        }
        if (typeof value != "string" ) {
            throw new TypeError("Параметр \"Фамилия\" введён неверно ");
        }
		this._Surname = value;
	}
	setAge(value)
	{
		if (value < 16) throw new Error("Слишком маленький возраст");
		if (value > 60) throw new Error ("Слишком большой возраст");
        if (typeof value != "number" ) {
            throw new TypeError("Неправильно введено поле \"возраст\" ");
        }
        this._Age = value;
	}
	setMark(value)
	{
		if (value < 0.0) throw new Error("Вы ввели слишком маленькое значение");
        if (value > 10.0) throw new Error ("Вы ввели слишком большое значение");
        if (typeof value != "number" ) {
            throw new TypeError("Параметр \"Оценка\" введён неверно ");
        }
		this._AvgGrade = value;
	}
	getName() {return this._Name;};
	getSurname() {return this._Surname;};
	getAge(){ return this._Age;};
	getMark() {return this._AvgGrade;};
	constructor(Name, Surname, Age, AvgGrade)
	{
		this._Name = Name;
		this._Surname = Surname;
		this._Age = Age;
		this._AvgGrade = AvgGrade;
	}
};
 var primalStudents = () =>{
    var students = [];
    students[0] = new Student("Василий", "Завалов",Math.floor(Math.random() * (24 - 17) + 17) ,  (Math.random() * (10.0 - 4.0) + 4.0).toFixed(2)) ;
    students[1] = new Student("Алёна", "Прекрасная", Math.floor(Math.random() * (24 - 17) + 17), (Math.random() * (10.0 - 4.0) + 4.0).toFixed(2));
    students[2] = new Student("Степан", "Камсомолец", Math.floor(Math.random() * (24 - 17) + 17), (Math.random() * (10.0 - 4.0) + 4.0).toFixed(2));
    students[3] = new Student("Святослав", "Светлый",Math.floor(Math.random() * (24 - 17) + 17), (Math.random() * (10.0 - 4.0) + 4.0).toFixed(2));
    students[4] = new Student("Анна", "Лапенко", Math.floor(Math.random() * (24 - 17) + 17), (Math.random() * (10.0 - 4.0) + 4.0).toFixed(2));
    students[5] = new Student("Максим", "Сержант", Math.floor(Math.random() * (24 - 17) + 17), (Math.random() * (10.0 - 4.0) + 4.0).toFixed(2));
 
    return students;
 }
 function addRow(student, students){
     var tr = $("<tr/>", {class: "body_row"});
     //table.append(tr);
     tr.append('<td class=element>' + student._Name + '</td>');
     tr.append('<td class=element>' + student._Surname + '</td>');
     tr.append('<td class=element>' + student._Age + '</td>');
     tr.append('<td class=element>' + student._AvgGrade + '</td>');
     tr.append('<div class=remove>' + '</div>');
     $('table').append(tr);
     students.push(student);
 }
 var averageMark = () =>{
    var rez = 0;
    
    for (var i = 3; i < $('td').length; i+=4) {
        rez += Number($('td')[i].innerText);
    }
    rez = rez / ($('td').length / 4);
    return rez;
 }

 function addAverageMark(grade){
    $('h2').text("Cредний балл по всем студентам: " + grade.toFixed(2))
    $('body').append(element);
 }

 
(function(){
    var studArr = [];
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/array.json ');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() { 

        for (let i = 0; i < xhr.response.students.length; i++) {
            let s = xhr.response.students[i];
            studArr.push(new Student(s.name, s.surname, s.age, s.averageNote));
           
        }

        var students = [];
        for (let i = 0; i < studArr.length; i++) {
            addRow(studArr[i], students);
           
        }

        var average = averageMark();
        var element = $("<h2/>",{class:"averageMark"});
        element.text("Cредний балл по всем студентам: " + average.toFixed(2))
        $('body').append(element);

        var student1 = new Student();
        var formShow = document.show;
    
        $('.table').on('click', '.remove', function(){
            $(this).closest('tr').remove();
            $('.average-mark').remove();
            average = averageMark();
            addAverageMark(average);
        })

        var NameBox = formShow.Name1;
            NameBox.addEventListener("change", (e) =>{
                let value = e.target.value;
                student1.setName(value);
            })
            NameBox.addEventListener("blur", (e) =>{
                var text = NameBox.value.trim();
                if(text==="")
                    NameBox.style.borderColor = "red";
                else
                    NameBox.style.borderColor = "green";
            });
    
        var SurnameBox = formShow.Surname1;
            SurnameBox.addEventListener("change", (e) =>{
                let value = e.target.value;
                student1.setSurname(value);
            })
            SurnameBox.addEventListener("blur", (e) =>{
                var text = SurnameBox.value.trim();
                if(text==="")
                    SurnameBox.style.borderColor = "red";
                else
                    SurnameBox.style.borderColor = "green";
            });
        
        var ageBox = formShow.age1;
            ageBox.addEventListener("change", (e) =>{
                let value = Number(e.target.value);
                student1.setAge(value);
            })
            ageBox.addEventListener("blur", (e) =>{
                var text = ageBox.value.trim();
                if(text==="")
                    ageBox.style.borderColor = "red";
                else
                    ageBox.style.borderColor = "green";
            });
    
        var markBox = formShow.mark1;
            markBox.addEventListener("change", (e) =>{
                let value = Number(e.target.value);
                student1.setMark(value);
            })
            markBox.addEventListener("blur", (e) =>{
                var text = markBox.value.trim();
                if(text==="")
                    markBox.style.borderColor = "red";
                else
                    markBox.style.borderColor = "green";
            });

        $(".button1").on('click', function(){
            if (!NameBox.value){
                alert("Incorrect input!"+ "Input student's first name again."+ "error");
            }
            if (!SurnameBox.value){
                alert("Incorrect input!"+ "Input student's first name again."+ "error");
            }
            if (!ageBox.value) {
                alert("Incorrect input!"+ "Input student's age again."+ "error");
            }
            if (!markBox.value) {
                alert("Incorrect input!"+ "Input student's age again."+ "error");   
            }
            else{
            addRow(student1, students);
            $('.averageMark').remove();
            average = averageMark();
            addAverageMark(average);
            }
        });
    };
}())