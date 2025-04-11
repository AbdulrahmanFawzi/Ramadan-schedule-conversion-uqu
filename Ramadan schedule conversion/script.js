// Male students time periods
const maleTimePeriods = [
  "08:00 - 08:50 ص",
  "09:00 - 09:50 ص",
  "10:00 - 10:50 ص",
  "11:00 - 11:50 ص",
  "01:00 - 01:50 م",
  "02:00 - 02:50 م",
  "04:00 - 04:50 م",
  "05:00 - 05:50 م",
  "06:00 - 06:50 م",
  "07:00 - 07:50 م",
  "08:00 - 08:50 م",
  "09:00 - 09:50 م"
];

// Female students time periods
const femaleTimePeriods = [
  "08:00 - 08:50 ص",
  "09:00 - 09:50 ص",
  "10:00 - 10:50 ص",
  "11:00 - 11:50 ص",
  "12:00 - 12:50 م",
  "01:00 - 01:50 م",
  "02:00 - 02:50 م",
  "03:00 - 03:50 م",
  "04:00 - 04:50 م",
  "05:00 - 05:50 م",
  "06:00 - 06:50 م",
  "07:00 - 07:50 م"
];

// Ramadan time mapping
const ramadanTimeMap = {
  // الفترة الأولى 
  "08:00 - 08:50 ص": "09:00 - 09:35 ص",
  // الفترة الثانية
  "09:00 - 09:50 ص": "09:40 - 10:15 ص",
  // الفترة الثالثة
  "10:00 - 10:50 ص": "10:20 - 10:55 ص",
  // الفترة الرابعة
  "11:00 - 11:50 ص": "11:00 - 11:35 ص",
  // الفترة الخامسة (طالبات)
  "12:00 - 12:50 م": "11:40 - 12:15 م",
  // الفترة الخامسة (طلاب) / السادسة (طالبات)
  "01:00 - 01:50 م": "12:20 - 12:55 م",
  // الفترة السادسة (طلاب) / السابعة (طالبات)
  "02:00 - 02:50 م": "01:05 - 01:40 م",
  // الفترة الثامنة (طالبات)
  "03:00 - 03:50 م": "01:45 - 02:20 م",
  // الفترة السابعة (طلاب) / التاسعة (طالبات)
  "04:00 - 04:50 م": "02:25 - 03:00 م",
  // الفترة الثامنة (طلاب) / العاشرة (طالبات)
  "05:00 - 05:50 م": "03:05 - 03:40 م",
  // الفترة التاسعة (طلاب) / الحادية عشرة (طالبات)
  "06:00 - 06:50 م": "03:45 - 04:20 م",
  // الفترة العاشرة (طلاب) / الثانية عشرة (طالبات)
  "07:00 - 07:50 م": "04:30 - 05:05 م",
  // الفترة الحادية عشرة (طلاب)
  "08:00 - 08:50 م": "04:30 - 05:05 م",
  // الفترة الثانية عشرة (طلاب)
  "09:00 - 09:50 م": "04:30 - 05:05 م"
};

// Function to map period labels to their names
const periodLabels = {
  0: "الأولى",
  1: "الثانية",
  2: "الثالثة",
  3: "الرابعة",
  4: "الخامسة",
  5: "السادسة",
  6: "السابعة",
  7: "الثامنة",
  8: "التاسعة",
  9: "العاشرة",
  10: "الحادية عشرة",
  11: "الثانية عشرة"
};

// Days mapping in Arabic
const daysInArabic = {
  'sunday': 'الأحد',
  'monday': 'الإثنين',
  'tuesday': 'الثلاثاء',
  'wednesday': 'الأربعاء',
  'thursday': 'الخميس'
};

// Function to get current time periods based on selected student type
function getCurrentTimePeriods() {
  const studentType = document.querySelector('input[name="studentType"]:checked').value;
  return studentType === "male" ? maleTimePeriods : femaleTimePeriods;
}

// Add initial course inputs
window.onload = function() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
  days.forEach(day => {
      addCourseInput(day);
  });
  
  // Add event listener for student type change
  const studentTypeRadios = document.querySelectorAll('input[name="studentType"]');
  studentTypeRadios.forEach(radio => {
      radio.addEventListener('change', updateTimePeriods);
  });
};

// Function to update time periods when student type changes
function updateTimePeriods() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
  days.forEach(day => {
      const containers = document.querySelectorAll(`#${day}-courses .course-input`);
      containers.forEach(container => {
          const select = container.querySelector('.course-time-select');
          const selectedValue = select.value;
          
          // Save current selection if possible
          updateTimeOptions(select);
          
          // Try to set the same value if it exists in new options
          const options = select.querySelectorAll('option');
          let valueExists = false;
          
          for (let option of options) {
              if (option.value === selectedValue) {
                  select.value = selectedValue;
                  valueExists = true;
                  break;
              }
          }
          
          // If value doesn't exist, select first option
          if (!valueExists && options.length > 0) {
              select.selectedIndex = 0;
          }
      });
  });
}

// Function to update time options in a select element
function updateTimeOptions(select) {
  const timePeriods = getCurrentTimePeriods();
  select.innerHTML = '';
  
  timePeriods.forEach((period, index) => {
      const option = document.createElement('option');
      option.value = period;
      option.textContent = `${periodLabels[index]} (${period})`;
      select.appendChild(option);
  });
}

// Function to handle period selection change
function updatePeriodSelection(selectElement) {
  const container = selectElement.closest('.course-input');
  const periodTwo = container.querySelector('.period-two');
  const endTimeSelect = container.querySelector('.course-end-time-select');
  const periodType = selectElement.value;
  
  if (periodType === 'single') {
      periodTwo.style.display = 'none';
      endTimeSelect.disabled = true;
  } else {
      periodTwo.style.display = 'block';
      endTimeSelect.disabled = false;
      
      // Update the second period dropdown based on the first one
      const firstPeriodSelect = container.querySelector('.course-time-select');
      firstPeriodSelect.addEventListener('change', function() {
          updateSecondPeriodOptions(firstPeriodSelect, endTimeSelect);
      });
      
      updateSecondPeriodOptions(firstPeriodSelect, endTimeSelect);
  }
}

// Function to update second period options based on first period
function updateSecondPeriodOptions(firstSelect, secondSelect) {
  const timePeriods = getCurrentTimePeriods();
  const selectedIndex = timePeriods.indexOf(firstSelect.value);
  
  if (selectedIndex !== -1 && selectedIndex < timePeriods.length - 1) {
      const nextPeriod = timePeriods[selectedIndex + 1];
      secondSelect.innerHTML = '';
      
      const option = document.createElement('option');
      option.value = nextPeriod;
      option.textContent = `${periodLabels[selectedIndex + 1]} (${nextPeriod})`;
      secondSelect.appendChild(option);
  }
}

// Function to add a new course input for a specific day
function addCourseInput(day) {
  const container = document.getElementById(`${day}-courses`);
  const courseDiv = document.createElement('div');
  courseDiv.className = 'course-input';
  
  const timePeriods = getCurrentTimePeriods();
  
  courseDiv.innerHTML = `
      <div class="course-row">
          <div class="course-name">
              <label>اسم المقرر:</label>
              <input type="text" class="course-name-input" placeholder="مثال: رياضيات 101">
          </div>
      </div>
      <div class="course-row">
          <div class="course-time" style="flex:2">
              <label>الوقت:</label>
              <div class="period-selection">
                  <select class="course-periods-select" onchange="updatePeriodSelection(this)">
                      <option value="single">فترة واحدة</option>
                      <option value="double">فترتان متتاليتان</option>
                  </select>
              </div>
          </div>
      </div>
      <div class="course-row period-container">
          <div class="period-one">
              <label>الفترة:</label>
              <select class="course-time-select"></select>
          </div>
          <div class="period-two" style="display:none;">
              <label>تستمر حتى:</label>
              <select class="course-end-time-select" disabled></select>
          </div>
      </div>
      <div class="course-row">
          <label>نوع المحاضرة:</label>
          <select class="course-type-select">
              <option value="نظري">نظري</option>
              <option value="عملي">عملي</option>
          </select>
      </div>
  `;
  
  container.appendChild(courseDiv);
  
  // Update time options
  const select = courseDiv.querySelector('.course-time-select');
  const endTimeSelect = courseDiv.querySelector('.course-end-time-select');
  updateTimeOptions(select);
  updateTimeOptions(endTimeSelect);
}

function convertSchedule() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
  const scheduleGridBody = document.getElementById('schedule-grid-body');
  scheduleGridBody.innerHTML = '';
  
  // Get all course data
  const courseData = [];
  let hasData = false;
  
  days.forEach(day => {
      const courseContainers = document.querySelectorAll(`#${day}-courses .course-input`);
      
      courseContainers.forEach(container => {
          const courseName = container.querySelector('.course-name-input').value.trim();
          const periodType = container.querySelector('.course-periods-select').value;
          const courseTime = container.querySelector('.course-time-select').value;
          const courseType = container.querySelector('.course-type-select').value;
          
          if (courseName) {
              hasData = true;
              let ramadanTime;
              
              // التعامل مع الفترات المزدوجة بشكل صحيح
              if (periodType === 'double') {
                  // للفترات المزدوجة، نحتاج إلى تحديد الفترة الثانية
                  const timePeriods = getCurrentTimePeriods();
                  const selectedIndex = timePeriods.indexOf(courseTime);
                  
                  if (selectedIndex !== -1 && selectedIndex < timePeriods.length - 1) {
                      const nextPeriod = timePeriods[selectedIndex + 1];
                      
                      // الحصول على وقت البداية من الفترة الأولى
                      const firstPeriodRamadan = ramadanTimeMap[courseTime];
                      // الحصول على وقت النهاية من الفترة الثانية
                      const secondPeriodRamadan = ramadanTimeMap[nextPeriod];
                      
                      if (firstPeriodRamadan && secondPeriodRamadan) {
                          // استخراج وقت البداية من الفترة الأولى
                          const startTime = firstPeriodRamadan.split(" - ")[0];
                          // استخراج وقت النهاية من الفترة الثانية
                          const endTime = secondPeriodRamadan.split(" - ")[1];
                          
                          ramadanTime = `${startTime} - ${endTime}`;
                      } else {
                          ramadanTime = ramadanTimeMap[courseTime] || "وقت غير متاح";
                      }
                  } else {
                      ramadanTime = ramadanTimeMap[courseTime] || "وقت غير متاح";
                  }
              } else {
                  ramadanTime = ramadanTimeMap[courseTime] || "وقت غير متاح";
              }
              
              courseData.push({
                  day: day,
                  courseName: courseName,
                  regularTime: courseTime,
                  ramadanTime: ramadanTime,
                  courseType: courseType,
                  periodType: periodType
              });
          }
      });
  });
  
  // Get all unique Ramadan times for the grid
  let ramadanTimes = Array.from(new Set(courseData.map(course => course.ramadanTime)));
  
  // خريطة لأوقات رمضان وقيمها الترتيبية لاستخدامها في الفرز
  const timeOrder = [
      "09:00 - 09:35 ص",
      "09:40 - 10:15 ص",
      "09:00 - 10:15 ص", // فترة مزدوجة 1+2
      "10:20 - 10:55 ص",
      "09:40 - 10:55 ص", // فترة مزدوجة 2+3
      "10:20 - 11:35 ص", // فترة مزدوجة 3+4
      "11:00 - 11:35 ص",
      "11:40 - 12:15 م",
      "11:00 - 12:15 م", // فترة مزدوجة 4+5
      "12:20 - 12:55 م",
      "11:40 - 12:55 م", // فترة مزدوجة 5+6
      "01:05 - 01:40 م",
      "12:20 - 01:40 م", // فترة مزدوجة 6+7
      "01:45 - 02:20 م",
      "01:05 - 02:20 م", // فترة مزدوجة 7+8
      "02:25 - 03:00 م",
      "01:45 - 03:00 م", // فترة مزدوجة 8+9
      "03:05 - 03:40 م",
      "02:25 - 03:40 م", // فترة مزدوجة 9+10
      "03:45 - 04:20 م",
      "03:05 - 04:20 م", // فترة مزدوجة 10+11
      "04:30 - 05:05 م",
      "03:45 - 05:05 م"  // فترة مزدوجة 11+12
  ];
  
  const timeOrderMap = {};
  timeOrder.forEach((time, index) => {
      timeOrderMap[time] = index;
  });
  
  // فرز أوقات رمضان حسب تسلسلها الطبيعي
  ramadanTimes.sort((a, b) => {
      const orderA = timeOrderMap[a] || 999;
      const orderB = timeOrderMap[b] || 999;
      return orderA - orderB;
  });
  
  // Create the grid rows for each time slot
  ramadanTimes.forEach(time => {
      const row = document.createElement('tr');
      
      // Time column
      const timeCell = document.createElement('td');
      timeCell.className = 'time-column';
      timeCell.textContent = time;
      row.appendChild(timeCell);
      
      // Day columns
      days.forEach(day => {
          const dayCell = document.createElement('td');
          const dayCoursesAtTime = courseData.filter(course => 
              course.day === day && course.ramadanTime === time
          );
          
          if (dayCoursesAtTime.length === 0) {
              dayCell.className = 'no-courses';
          } else {
              // Add courses to the cell
              dayCoursesAtTime.forEach(course => {
                  const courseDiv = document.createElement('div');
                  courseDiv.className = `course-bubble lecture-${course.courseType === 'نظري' ? 'theory' : 'practical'}`;
                  
                  // هنا التعديل الرئيسي - إزالة عرض الوقت مع اسم المادة
                  courseDiv.innerHTML = `
                      <div class="course-type-tag">${course.courseType}</div>
                      <div class="course-bubble-text">${course.courseName}</div>
                  `;
                  // تم حذف السطر التالي:
                  // <div class="course-time-text">${course.regularTime}</div>
                  
                  dayCell.appendChild(courseDiv);
              });
          }
          
          row.appendChild(dayCell);
      });
      
      scheduleGridBody.appendChild(row);
  });
  
  document.getElementById('result-section').style.display = hasData ? 'block' : 'none';
  
  if (!hasData) {
      alert('الرجاء إدخال اسم مقرر واحد على الأقل.');
  }
}

// Function to clear all inputs
function clearAll() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
  
  days.forEach(day => {
      const container = document.getElementById(`${day}-courses`);
      container.innerHTML = '';
      addCourseInput(day);
  });
  
  document.getElementById('result-section').style.display = 'none';
}