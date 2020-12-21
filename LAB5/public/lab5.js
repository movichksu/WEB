let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/api/array.json ');
xhr.responseType = 'json';
xhr.send();
let students = [];
let studentsTable;
let i = 0
var averageMark = () =>{
    var tdEl = document.querySelectorAll('td');
    var rez = 0;
    
    for (var i = 3; i < tdEl.length; i+=6) {
        rez += Number(tdEl[i].innerText);
    }
    rez = rez / (tdEl.length / 6);
    return rez;
 }
 
 function addAverageMark(grade){
    var body = document.querySelector("body");
    var element = document.querySelector("h2");
    element.innerHTML="Cредний балл по всем студентам: " + grade.toFixed(2)
    element.className = "averageMark";
    //element.textContent = "Cредний балл по всем студентам: " + grade.toFixed(2);
    body.appendChild(element);
 }

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

function validFlields(fields) {
    for (let field of fields) {
        if (field.value.length == 0) return false
    }
return true
}
function newStudent() {
    let form = document.querySelector('form')
    let fields = form.querySelectorAll('input')
    let student
    if (!validFlields(fields)) {
         alert("Fill all flields");
             return;
     }
     try {
        student = new Student(
        fields[0].value,
        fields[1].value,
        fields[2].value,
        fields[3].value
        )
       } catch (e) {
            alert(e);
            return;
 	}
 	return student
}

function add() {
	 let student=newStudent()
   	 if (student==undefined) return
   	 students[i]=student
   	 i++;
   	 ReactDOM.render(
           <Table data={students}/>,
           document.getElementById("table")
       )
    
 }
class Cell extends React.Component {
    render() {
        return <td class="element">{this.props.value}</td>;
    }
}
class CellButton extends React.Component {
	constructor(props){
		super(props)
		 this.state={position:this.props.position}
		 this.state.class=props.action
         this.press = this.press.bind(this);
	}
	press(){
		switch(this.state.class){
			case "delete": this.delete();break;
			case "edit":this.edit();break;
		}
	}
    render() {
        return <td onClick={this.press} ><img src={this.props.src}/></td>;
    }
    delete(){
    	students.splice(this.state.position,1)

    	  ReactDOM.render(
           <Table data={students} />,
           document.getElementById("table")
       )

    }
    edit(){
    	  let student=newStudent()
    	  if (student==undefined) return
          students[this.state.position]=student
    	  ReactDOM.render(
           <Table data={students} />,
           document.getElementById("table")
       )
    }
    

}

class Row extends React.Component {
	constructor(props){
		super(props)
		this.state={position:i}
		i++
	}
    render() {
        return (
        	<tr class="body_row">
        <Cell value={this.props.student.getName()}/>
        <Cell value={this.props.student.getSurname()}/>
        <Cell value={this.props.student.getAge()}/>
        <Cell value={this.props.student.getMark()}/>
        <CellButton src="edit.png" action="edit" position={this.state.position}/>
        <CellButton src="del.png" action="delete" position={this.state.position}/>
        </tr>)
    }
}

class Table extends React.Component {
    render() {
        return( 
        <div>
        	<table class="table">
        	<tbody>
            <tr class = "header_row">
                <th class = "header_td">Фамилия</th>
                <th class = "header_td">Имя</th>
                <th class = "header_td">Возраст</th>
                <th class = "header_td">Средний балл</th>
            </tr>
            {
       			this.props.data.map((s)=>{
       				return <Row student={s}/>
       			})
       		}
            {addAverageMark(averageMark())}
        </tbody>
        </table>
        <input type="button" class="button1" value="Добавить студента" onClick={add}/>
        </div>
        )
    }
}


xhr.onload= ()=>{
	 xhr.response.students.forEach((s)=>{
        students.push(new Student(s._Name, s._Surname, s._Age, s._AvgGrade));
    })
     ReactDOM.render(
           <Table data={students} />,
           document.getElementById("table")
       )
       addAverageMark(averageMark())

}
   