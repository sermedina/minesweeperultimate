App.controller('GameController', ['$rootScope','$scope', 'GameService', '$location','DTOptionsBuilder', 'DTColumnDefBuilder',
    function($rootScope,$scope, GameService, $location,DTOptionsBuilder,DTColumnDefBuilder) {            
    
    var self = this;
    
    
    $scope.submitted = false;            
    
    clearValidationErrorMessages = function() {
    	self.formData.$setPristine(true);
    	$scope.serverErrors="";
    },
            
    self.formData = {};        
        
    self.gamesForList = {};
    
                
    self.rangeArray= function (start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
    

    $scope.numberOfRowsList = self.rangeArray(3,30);
    $scope.numberOfColumnsList = self.rangeArray(3,30);
    $scope.numberOfMinesList = self.rangeArray(3,99);
     
    
    
    self.getGameList = function(){
        GameService.getGameList()        
        .then(
            function(d) {                
                self.gamesForList = d;
                console.log(self.gamesForList);

            },
            function(errResponse){
                console.error('Error while fetching games');
                //self.showMessageError('Error while fetching users',errResponse);
            }
        );
    };
    
     self.isValidCell = function(row,col)
        {
            // Returns true if row number and column number
            // is in range
            return (row >= 0) && (row < self.formData.numberOfRows) &&
                   (col >= 0) && (col < self.formData.numberOfColumns);
        }

    
    self.newGame = function(){
            $scope.submitted = true;
            console.log(self.formData);
            const rows= self.formData.numberOfRows;
            const columns= self.formData.numberOfColumns;
            let mines = self.formData.numberOfMines;
            
            const cells= rows*columns;
            
            if (cells/mines < 2) {
                $scope.mineNumberValidation = true;
                return;
            }
            
            //Matrix initialization
            //mineNearby: 
            //-1 it's a mine
            // 0 doesn't have a mine nearby
            // N>0 there's N mines nearby
            // isDiscovered: true if the user has clicked on it
            // isFlag: true if the user has put a flag
            
        
            //let board = Array(rows).fill({isDiscovered:false,isFlag:false, mineNearby:0}).map(()=>Array(columns).fill({isDiscovered:false,isFlag:false, mineNearby:0}))
            let board= [];
            
            for (i=0; i<rows; i++) {
                board[i]=[];                
                for (j=0; j<columns; j++) {                    
                    board[i][j]= {isDiscovered:false,isFlag:false, mineNearby:0};                
                }
                
            }
            
            //Setting mines
            for (i=0; 0<mines; i++)
            {
               const rand1 = (Math.random()*10) % (rows*columns);
               const rand2 = (Math.random()*10) % (rows*columns);
               var x = parseInt(rand1 % rows);
               var y = parseInt(rand2 % columns);
               console.log("X " + x);
               console.log("Y " + y);
               //var test = 1.2;
               //var test2= Math.abs(test);
              // console.log("TEST " + test2);

               if (board[x][y].mineNearby != -1)
               {
                   board[x][y].mineNearby=-1;
                   mines--;
               }
           }
           
           for (i=0; i<rows; i++) {              
                for (j=0; j<columns; j++) {
                    let count= self.countNearbyMines(i,j,board);
                    //console.log("BOARD "+ i + " " + j);
                    //console.log("VALUE " +board[i][j].mineNearby);
                    //console.log("COUNT " + count);
                    
                    if (count>0 && board[i][j].mineNearby!=-1) {
                        //console.log("NEW VALUE " + count);
                        board[i][j].mineNearby=count;
                    }            
                }
                
            }
           

           
           $scope.newBoard= board;
           
           const newBoard= JSON.stringify(board);
        

            console.log(newBoard);
            
            self.formData.board=newBoard;

            GameService.newGame(self.formData)
              .then (function(response) {
                  $scope.message = response.status;           
                  $scope.submitted = false;
                  self.formData=response.data;
                  //self.addSuccessful();
              },
              
              function (errors) {
                 
                    $scope.serverErrors=errors.data;
                    console.log(errors.data);
                    for (var errorKey in errors.data) {
                    //console.log(errorKey + ':' + errors.data[errorKey]);
                    $scope.gameForm[errorKey].$dirty = true;
                    }                 
                  
               
            });
        
        
    },
   
      
   self.countNearbyMines = function(row,col,board){

    let count = 0;
  

  
        // Up cell
        if (self.isValidCell(row-1, col))
        {
               if (board[row-1][col].mineNearby== -1)
               count++;
        }
 
  
        // Down cell
        if (self.isValidCell(row+1, col))
        {
               if (board[row+1][col].mineNearby== -1)
               count++;
        }
  
        // Right
        if (self.isValidCell(row, col+1))
        {
            if (board[row][col+1].mineNearby== -1)
               count++;
        }
  
  
        // Left cell
        if (self.isValidCell(row, col-1))
        {
               if (board[row][col-1].mineNearby== -1)
               count++;
        }
  
  
        // Upper-right cell
        if (self.isValidCell(row-1, col+1))
        {
            if (board[row-1][col+1].mineNearby== -1)
               count++;
        }
  
  
        // Upper-left cell
        if (self.isValidCell(row-1, col-1))
        {
             if (board[row-1][col-1].mineNearby== -1)
               count++;
        }
 
  
        // Bottom-right cell
        if (self.isValidCell(row+1, col+1))
        {
               if (board[row+1][col+1].mineNearby== -1)
               count++;
        }
  
  
        // Bottom-left cell
        if (self.isValidCell(row+1, col-1))
        {
            if (board[row+1][col-1].mineNearby== -1)
               count++;
        }
        
  
        return count;
    },
            

 

    self.getGameList();
    
    self.showDetail = function (id) {
            $location.path("game/gamedetails/" + id);
    };
    
    self.opennewGame = function () {
        $location.path("/game/newGame");
    };
    
    self.showGameList = function () {
        $location.path("/home/games");
    };
    
        
 self.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(5)
            .withOption('order', [0, 'desc'])
            .withLanguage($rootScope.resources.tableMessage);
            
    self.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2)
        
    ];
  
        
  
}]);
