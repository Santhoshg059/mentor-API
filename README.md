# Mentor-Student Management API
The Mentor-Student  Management API simplifies mentor-student relationship administration with features for CRUD operations.

# Key API Endpoints

> [!TIP]
> Create Mentor (POST) :Establish a new mentor profile.
> Endpoint: /mentors/create

> [!TIP]
> Create Student (POST) :Register a new student.
> Endpoint: /students/create

> [!TIP]
> Assign Student to Mentor (POST):Link a student to a mentor, fostering a learning relationship.
> Endpoint: /common/assign-mentor/:mentorName/:studentName

> [!TIP]
> Change Mentor for Student (PUT)]: Assign a new mentor to a student or modify an existing mentor-student relationship.
>Endpoint: /common/change-mentor/:studentName/:newMentorName

> [!TIP]
> Get All Students for a Mentor (GET) : Retrieve a comprehensive list of all students under the guidance of a specific mentor.
>Endpoint: /mentors/getAllStudents/:mentorId


> [!TIP]
> Get Previously Assigned Mentor for a Student (GET) :Access the historical data of a student's previously assigned mentor.
>Endpoint: /students/getPreviousMentor/:studentId







