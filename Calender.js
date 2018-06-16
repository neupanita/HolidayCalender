 let holiday = {
            holidayList: [
          { id: "1", From: "1/1", To: "1/14", SeasonalLogo: "NewYears.png", Actual2018: "1/1/2018", SeasonHoliday: "New Years", OfficeClosed: "Y",isFixed: "Fixed", howToCompute: "", parent: ""},
          { id: "2", From: "2/12", To: "2/14", SeasonalLogo: "Valentines.png", Actual2018: "1/1/2018", SeasonHoliday: "Valentines Day", OfficeClosed: " ", isFixed: "Fixed", howToCompute: "", parent: "" },
          { id: "3", From: "2/15", To: "2/20 ", SeasonalLogo: "company.png", Actual2018: "2/19/2018", SeasonHoliday: "Presidents Day", OfficeClosed: "Y", isFixed: "Computed", howToCompute: "1", parent: "" },
          { id: "4", From: "3/14", To: "3/21", SeasonalLogo: "stpatrick.png", Actual2018: "3/17/2018", SeasonHoliday: "St.Patrick", OfficeClosed: " ", isFixed: "Fixed", howToCompute: "", parent: "" },
          { id: "5", From: "5/26", To: "5/29", SeasonalLogo: "memorial.png", Actual2018: "5/28/2018", SeasonHoliday: "Memorial Day", OfficeClosed: "Y", isFixed: "Computed", howToCompute: "2", parent: "" },
          { id: "6", From: "7/1", To: "7/8", SeasonalLogo: "usaFlag.png", Actual2018: "7/4/2018", SeasonHoliday: "Independence", OfficeClosed: "Y", isFixed: "Fixed", howToCompute: "", parent: "" },
          { id: "7", From: "9/1", To: "9/8", SeasonalLogo: "usaFlag.png", Actual2018: "9/3/2018", SeasonHoliday: "Labor", OfficeClosed: "Y", isFixed: "Computed", howToCompute: "3", parent: "" },
          { id: "8", From: "10/28", To: "11/4", SeasonalLogo: "halloween.png", Actual2018: "10/31/2018", SeasonHoliday: "Halloween", OfficeClosed: "Y", isFixed: "Fixed", howToCompute: "", parent: "" },
          { id: "9", From: "11/8", To: "11/15", SeasonalLogo: "usaFlag.png", Actual2018: "11/12/2018", SeasonHoliday: "Veterans", OfficeClosed: "Y", isFixed: "Fixed", howToCompute: "", parent: "" },
          { id: "10", From: "11/20", To: "11/30", SeasonalLogo: "thanksgiving.png", Actual2018: "11/22/2018", SeasonHoliday: "ThanksGiving", OfficeClosed: "Y", isFixed: "Computed", howToCompute: "4", parent: "" },
          { id: "11", From: "11/20", To: "11/30 ", SeasonalLogo: "thanksgiving.png", Actual2018: "11/23/2018", SeasonHoliday: "Day After ThanksGiving", OfficeClosed: "Y", isFixed: "Fixed", howToCompute: "+1", parent: "Thanksgiving" },
          { id: "12", From: "12/10", To: "12/25", SeasonalLogo: "Winter.png", Actual2018: "12/24/2018", SeasonHoliday: "christmas Eve", OfficeClosed: "Y", isFixed: "Fixed", howToCompute: "-1", parent: "Chritmas" },
          { id: "13", From: "12/10", To: "12/25", SeasonalLogo: "Winter.png", Actual2018: "12/25/2018", SeasonHoliday: "christmas", OfficeClosed: "Y", isFixed: "Fixed", howToCompute: "", parent: "" },
          { id: "14", From: "12/26", To: "12/31", SeasonalLogo: "Winter.png", Actual2018: "12/31/2018", SeasonHoliday: "New Year eve", OfficeClosed: "Y", isFixed: "Fixed", howToCompute: "-1", parent: "New Years" }]

        };

    		function getLogo(dt){
    			var logo= getTodaysLogo(dt);
    			alert(logo);
    		}

      	function IsClosed(dt){
      			alert(isOfficeClosed(dt));
      	}
      	function message(dt){
      			var checkMessage=getMessage(dt);
      			alert(checkMessage)
      	}

        function getTodaysLogo(dt) {
            var idrange = getRange(dt);
            for (i = 0; i < idrange.length; i++) {
              let id = idrange[i];
              if (id != null) {
                  var data = getRow(id);                
                  var SessonalLogo = data["SeasonalLogo"];
          				if(SessonalLogo!=null)
          				{
                    return SessonalLogo;
          				}
              }
            }
            return "company.png";
        }

        function getRow(id) {
            let currentData = null;
            holiday.holidayList.forEach(function (item) {
                if (item.id === id) {
                    currentData = item;
                }
            });
            return currentData;
        }

        function getRange(dt) {
            var count =0;
            var idRange= [];
            var tmp = dt.substring(dt.length - 4);
            dt = new Date(dt);

            holiday.holidayList.forEach(function (item) {
                var fromDate = new Date((item.From) + "/" + tmp);
                var toDate = new Date((item.To) + "/" + tmp);
                if ((dt <= toDate && dt >= fromDate)) {
                    idRange[count] = item.id;
                    count++;
                }
            });
            return idRange;            
        }

        function getMessage(dt) {
		if(isOfficeClosed(dt)=="TRUE"){
			  var idrange = getRange(dt);
			  for (i = 0; i < idrange.length; i++) {
				let id = idrange[i];
				if (id != null) {
					let data = getRow(id);                
					let hday = data["SeasonHoliday"];
					if(data["parent"] !== "") {
					  hday = data["parent"];
					}
					return hday;
				}
			}
          }
          return "";
        }

        function isSameDate(dt1, dt2){
          return dt1.getDate() == dt2.getDate() && dt1.getMonth() == dt2.getMonth();
        }

        function getDateForYear(year, dt){
          return new Date(dt.setFullYear(year));
        }

        function computeWeekdayOfMonthInYear(weekday, n, month, dt) {
          var cnt = 0,
          dt1 = new Date(dt.getFullYear(), month, 1);
          while (true) {
            if (dt1.getDay() === weekday) {
              if (++cnt >= n) {
                break;
              }
            }
            dt1.setDate(dt1.getDate() + 1);
          }
          return dt1;
        }

        function computeLastMondayOfMonth(month, dt){
          dt1 = new Date(dt.getFullYear(), month, 1);
          dt.setDate(1)
          var mondays=[];
            while (dt1.getMonth() === month) {
                if(dt1.getDay()==1){
                mondays.push(new Date(dt1.getTime()));
                dt1.setDate(dt1.getDate() + 7);
              }else{
                dt1.setDate(dt1.getDate() + 1);
              }
            }
            return mondays[mondays.length-1];
        }
       // console.log(computeLastMondayOfMonth(4, new Date("5/28/2018")));

        function isOfficeClosed(dt) {
          let idrange = getRange(dt);
          for (i = 0; i < idrange.length; i++) {
            let id = idrange[i];
            let ret = "FALSE";
            let currentEvent = getRow(id);
            if(currentEvent!=undefined){
                dt = new Date(dt);
                var dateForYear = getDateForYear(dt.getFullYear(), new Date(currentEvent["Actual2018"]));
                if(currentEvent["isFixed"]!="Fixed"){
                  switch (currentEvent["howToCompute"]) {
                    case "1":
                        dateForYear = computeWeekdayOfMonthInYear(1,3,1,dateForYear);
                        break;
                    case "2":
                        dateForYear = computeLastMondayOfMonth(4, dateForYear);
                        break;
                    case "3":
                        dateForYear = computeWeekdayOfMonthInYear(1,1,8,dateForYear);
                        break;
                    case "4":
                        dateForYear = computeWeekdayOfMonthInYear(4,4,10,dateForYear);
                        break;
                  }
                }
                var dateAfter = getDateForYear(dt.getFullYear(), new Date(currentEvent["Actual2018"]));
                var dateBefore = getDateForYear(dt.getFullYear(), new Date(currentEvent["Actual2018"]));
                dateAfter.setDate(dateAfter.getDate()+1);
                dateBefore.setDate(dateBefore.getDate()-1);

                if(isSameDate(dt, dateForYear)){
                  return "TRUE";
                }

                if(dateForYear.getDay()==0 && dt.getDay()==1 && (isSameDate(dt, dateBefore) || isSameDate(dt, dateAfter))){
                  return "TRUE";
                }else if(dateForYear.getDay()==6 && dt.getDay()==5 && (isSameDate(dt, dateBefore) || isSameDate(dt, dateAfter))){
                  return "TRUE";
                }
              }
            }
          return "FALSE";
        }