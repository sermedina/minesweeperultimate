App.controller('GameController', ['ngToast','$rootScope','$scope','$window','$interval', '$timeout','GameService', '$route','$routeParams','$location','DTOptionsBuilder', 'DTColumnDefBuilder',
    function(ngToast,$rootScope,$scope,$window,$interval,$timeout, GameService,$route,$routeParams, $location,DTOptionsBuilder,DTColumnDefBuilder) {            
    
    var self = this;
    
    self.totalElapsedMs = 0;
    self.elapsedMs = 0;
    self.startTime;
    self.timerPromise;
   
    var param = $routeParams.id;

    $scope.submitted = false;
    
    self.flagMode=false;
    
    self.gameMode="Put flag";

    self.formData = {};        
        
    self.gamesForList = {};
       
                
    self.rangeArray= function (start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx);
    },
    

    $scope.numberOfRowsList = self.rangeArray(3,30);
    $scope.numberOfColumnsList = self.rangeArray(3,30);
    $scope.numberOfMinesList = self.rangeArray(3,99);
    
     
    self.hideSideBar= function(){
        $(".page-container").addClass("sidebar-collapsed").removeClass("sidebar-collapsed-back");
        $("#menu span").css({"position":"absolute"});
        $("footer").hide();
        
    },
 
    self.getGameList = function(){  
        
        GameService.getGameList()        
        .then(
            function(d) {                
                self.gamesForList = d;
                console.log(self.gamesForList);

            },
            function(errResponse){
                console.error('Error while fetching games');
            }
        );
    };
      
     self.isValidCell = function(row,col)
        {
            //Case when new game or already played game
            let rows = self.formData!==undefined && JSON.stringify(self.formData) !== '{}'?self.formData.numberOfRows:self.game.numberOfRows;
            let columns = self.formData!==undefined && JSON.stringify(self.formData) !== '{}'?self.formData.numberOfColumns:self.game.numberOfColumns;
            // Returns true if row number and column number
            // is in range
            return (row >= 0) && (row < rows) &&
                   (col >= 0) && (col < columns);
        },
                

    self.newGame = function(){
            $scope.submitted = true;
            
            //Depends if new game or finished game (Retry)
            let rows = self.formData!==undefined && JSON.stringify(self.formData) !== '{}'?self.formData.numberOfRows:self.game.numberOfRows;
            let columns = self.formData!==undefined && JSON.stringify(self.formData) !== '{}'?self.formData.numberOfColumns:self.game.numberOfColumns;
            let mines = self.formData!==undefined && JSON.stringify(self.formData) !== '{}'?self.formData.numberOfMines:self.game.numberOfMines;
            const movesLeft= (rows*columns) - mines;
            
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
            
       
            let board= [];
            
            for (i=0; i<rows; i++) {
                board[i]=[];                
                for (j=0; j<columns; j++) {                    
                    board[i][j]= {isDiscovered:false,isFlag:false, mineNearby:0};                
                }
                
            }
               
           $scope.newBoard= board;
           
           const newBoard= JSON.stringify(board);
           
           //If it is an already finished game (Retry)
           if (self.game) {
               self.reset();
               self.game.movesLeft=movesLeft;
               self.game.hasFirstMove=false;
               self.game.finished=false; 
               self.parseBoard=board;
               self.updateGame();
               self.start();
               
           } else {

            self.formData.board=newBoard;
            self.formData.movesLeft=movesLeft;
            self.formData.hasFirstMove=false;
            self.formData.lastTimePlayed=new Date();

            GameService.newGame(self.formData)
              .then (function(response) {
                  $scope.message = response.status;           
                  $scope.submitted = false;
                  $location.path("game/currentgame/" + response.result);
              },
              
              function (errors) {
                 
                    $scope.serverErrors=errors.data;
                    console.log(errors.data);
                    for (var errorKey in errors.data) {
                    $scope.gameForm[errorKey].$dirty = true;
                    }                 
                  
               
            });
        
           }
    },
            
    self.updateGame = function(gameFinished){            

    if (self.game && !self.game.finished) {
            self.game.totalTimePlayed = -self.getElapsedMs();
            self.game.lastTimePlayed= new Date();
            self.game.board= JSON.stringify(self.parseBoard);
            if (gameFinished) {
               self.game.finished=true; 
            }
            // Stop time tracking
            self.stop();
            GameService.updateGame(self.game)
              .then (function(response) {
                  $scope.message = response.status;           
                  self.formData=response.data;
              },
              
              function (errors) {
                    $scope.serverErrors=errors.data;
                    console.log(errors.data);
                    for (var errorKey in errors.data) {
                    $scope.gameForm[errorKey].$dirty = true;
                    }                 
            });
        }   
        
    },        
            
    self.getGame = function(id){
        GameService.getGame(id)
        .then(
            function(d) {
                 self.game = d;
                 self.parseBoard= JSON.parse(self.game.board);
                 console.log(d);
                 if (!self.game.finished) {
                    self.start();
                }
                      
            },
            function(errResponse){
                console.error('Error while fetching game');             
            }            
        );

    },
            
    //Save the game when browser closed or logout
    $scope.$on('$destroy', function () {
        self.updateGame();
    });
            
            
   //These functions are based in
   //https://www.geeksforgeeks.org/cpp-implementation-minesweeper-game/
   //implementation in C++ through console
   //with a couple of modifications and refactoring for graphical javascript board.
   //Safe first move logic improvement (in the link is terribly wrong -_-)
  
      
   self.countNearbyMines = function(row,col,board){

    let count = 0;

        // Up cell
        if (self.isValidCell(row-1, col))
        {
               if (board[row-1][col].mineNearby=== -1)
               count++;
        }
 
  
        // Down cell
        if (self.isValidCell(row+1, col))
        {
               if (board[row+1][col].mineNearby=== -1)
               count++;
        }
  
        // Right cell
        if (self.isValidCell(row, col+1))
        {
            if (board[row][col+1].mineNearby=== -1)
               count++;
        }
  
  
        // Left cell
        if (self.isValidCell(row, col-1))
        {
               if (board[row][col-1].mineNearby=== -1)
               count++;
        }
  
  
        // Upper-right cell
        if (self.isValidCell(row-1, col+1))
        {
            if (board[row-1][col+1].mineNearby=== -1)
               count++;
        }
  
  
        // Upper-left cell
        if (self.isValidCell(row-1, col-1))
        {
             if (board[row-1][col-1].mineNearby=== -1)
               count++;
        }
 
  
        // Bottom-right cell
        if (self.isValidCell(row+1, col+1))
        {
               if (board[row+1][col+1].mineNearby=== -1)
               count++;
        }
  
  
        // Bottom-left cell
        if (self.isValidCell(row+1, col-1))
        {
            if (board[row+1][col-1].mineNearby=== -1)
               count++;
        }        
  
        return count;
    },
            
    
    self.discoverCell = function(row,column){
        
        
        // This is to guarantee that the first move is
        // always safe
        // If it is the first move of the game
        // We asure this by delaying the mine generation    
        if (!self.game.hasFirstMove && self.game && !self.flagMode)
        {
            self.game.hasFirstMove=true;
            const rows= self.game.numberOfRows;
            const columns= self.game.numberOfColumns;
            let mines = self.game.numberOfMines;
            //Setting mines
            for (i=0; 0<mines; i++)
            {
               const rand1 = (Math.random()*10) % (rows*columns);
               const rand2 = (Math.random()*10) % (rows*columns);
               var x = parseInt(rand1 % rows);
               var y = parseInt(rand2 % columns);

               if (self.parseBoard[x][y].mineNearby !== -1 && x!==row && y!==column)
               {
                   self.parseBoard[x][y].mineNearby=-1;
                   mines--;
               }
           }
           
           for (i=0; i<rows; i++) {              
                for (j=0; j<columns; j++) {
                    let count= self.countNearbyMines(i,j,self.parseBoard);                   
                    if (count>0 && self.parseBoard[i][j].mineNearby!== -1) {
                        self.parseBoard[i][j].mineNearby=count;
                    }            
                }
                
            }
        }
                
        if  (self.parseBoard[row][column].isDiscovered || self.game.finished) {
            return;
        }
        if (self.flagMode) {
            if (self.parseBoard[row][column].isFlag) {
                self.parseBoard[row][column].isFlag=false;
            }else {
                self.parseBoard[row][column].isFlag=true;
            }    
            return;
        }

        switch(self.parseBoard[row][column].mineNearby) {
            case -1:
              self.discoverAllCells();
              ngToast.danger('YOU LOSE');
              self.updateGame(true);
              break;
            case 0:
                if(self.game.movesLeft===1) {
                ngToast.create('YOU WIN!');
                self.game.movesLeft--;
                self.updateGame(true);
            } else {
                self.discoverZeroCell(row,column);
                if(self.game.movesLeft===0) {
                  ngToast.create('YOU WIN!');
                  self.updateGame(true);
                }
            }
              break;
            default:
                if (self.game.movesLeft===1) {
                    ngToast.create('YOU WIN!');
                    self.updateGame(true);
                 }
                 self.game.movesLeft--;
                 self.parseBoard[row][column].isFlag=false;
                 self.parseBoard[row][column].isDiscovered=true;
        }
    },
            
    self.discoverAllCells = function()  {
        
        const rows = self.game.numberOfRows;
        const columns = self.game.numberOfColumns;
        for (i=0; i<rows; i++) {              
                for (j=0; j<columns; j++) {
                    self.parseBoard[i][j].isFlag=false;
                    self.parseBoard[i][j].isDiscovered=true;                
                }
                
        }       
    },
            
    self.discoverZeroCell = function(row,col) 
    {

        // Base Case of Recursion
        if (self.parseBoard[row][col].isDiscovered)
            return false;
        
        //Discover the cell and substract move counter
        self.parseBoard[row][col].isDiscovered=true;
        self.parseBoard[row][col].isFlag=false;
        self.game.movesLeft--;

            // Calculate the number of adjacent mines and put it
            // on the board

            let count = self.countNearbyMines(row, col, self.parseBoard);
            

            if (!count)
            {
                
                //Recur for all 8 adjacent cells
          
                // Up cell
                if (self.isValidCell(row-1, col))
                {
                    if (self.parseBoard[row-1][col].mineNearby!== -1) {
                       self.discoverZeroCell(row-1, col);
                   }
                }

                // Down cell
                if (self.isValidCell(row+1, col))
                {
                    if (self.parseBoard[row+1][col].mineNearby!== -1) {
                        self.discoverZeroCell(row+1, col);
                    }
                }

                //Right cell
                if (self.isValidCell(row, col+1))
                {
                    if (self.parseBoard[row][col+1].mineNearby!== -1) {
                        self.discoverZeroCell(row, col+1);
                    }    
                }

                //Left cell
                if (self.isValidCell(row, col-1))
                {
                    if (self.parseBoard[row][col-1].mineNearby!== -1) { 
                        self.discoverZeroCell(row, col-1);
                    }
                }

                //Upper-right cell
                if (self.isValidCell(row-1, col+1))
                {
                    if (self.parseBoard[row-1][col+1].mineNearby!== -1) {
                        self.discoverZeroCell(row-1, col+1);
                    }
                }

                //Upper-left cell
                if (self.isValidCell(row-1, col-1))
                {
                     if (self.parseBoard[row-1][col-1].mineNearby!== -1) {
                        self.discoverZeroCell(row-1, col-1);
                    }
                }

                //Bottom-right cell
                if (self.isValidCell(row+1, col+1))
                {
                     if (self.parseBoard[row+1][col+1].mineNearby!== -1) {
                        self.discoverZeroCell(row+1, col+1);
                    }
                }

                //Bottom-left cell
                if (self.isValidCell(row+1, col-1))
                {
                    if (self.parseBoard[row+1][col-1].mineNearby!== -1) {
                        self.discoverZeroCell(row+1, col-1);
                    }
                }
            }

            return false;
},
    //Start time tracking counter   
    self.start = function() {    
      if (!self.timerPromise) {
        self.startTime = new Date();
        //Start counting from last total time played
        self.startTime.setSeconds(self.startTime.getSeconds() + self.game.totalTimePlayed);
        self.timerPromise = $interval(function() {
        let now = new Date();
        self.elapsedMs = Math.abs(((self.startTime.getTime()/1000) -(now.getTime()/1000) ).toFixed(1));
          
        }, 1);
      }
    };
    
    //Stop time tracking counter
    self.stop = function() {
      if (self.timerPromise) {
        $interval.cancel(self.timerPromise);
        self.timerPromise = undefined;
        self.totalElapsedMs += self.elapsedMs;
        self.elapsedMs = 0;
      }
    },
    
    self.reset = function() {
      self.startTime = new Date();
      self.totalElapsedMs = self.elapsedMs = 0;
    },
    
    self.getElapsedMs = function() {
      return self.elapsedMs;
    },
            
    self.changeMode = function()  {
        if (!self.flagMode) {
            self.flagMode=true;
            self.gameMode="Discover";
        } else {
            self.flagMode=false;
            self.gameMode="Put flag";
        }
    };
    
    if ($window.innerWidth<400) {
           self.hideSideBar();
    }
    if (param) {
        self.getGame(param);
    } else { 
         $timeout(function(){ 
            self.getGameList();
         }, 2500);
    }    
   
    
    self.showDetail = function (id) {
        $location.path("game/currentgame/" + id);
        self.getGame(id);
    };
    
    self.opennewGame = function () {
        $location.path("/game/newGame");
    };
    
    self.showGameList = function () {
        $location.path("/home/games");
    };   
        
 self.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(10)
            .withOption('order', [0, 'desc'])
            .withOption('responsive', true)
            .withLanguage($rootScope.resources.tableMessage);
            
    self.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2)
        
    ];
  
        
  
}]);
