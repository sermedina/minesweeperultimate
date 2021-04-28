App.controller('GameController', ['$rootScope','$scope', 'GameService', '$route','$routeParams','$location','DTOptionsBuilder', 'DTColumnDefBuilder',
    function($rootScope,$scope, GameService,$route,$routeParams, $location,DTOptionsBuilder,DTColumnDefBuilder) {            
    
    var self = this;
    
    var param = $routeParams.id;

    $scope.submitted = false;
    
    self.flagMode=false;

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
            }
        );
    };
    
     self.isValidCell = function(row,col)
        {
            
            let rows = self.formData.numberOfRows!==undefined?self.formData.numberOfRows:self.game.numberOfRows;
            let columns = self.formData.numberOfColumns!==undefined?self.formData.numberOfColumns:self.game.numberOfColumns;
            // Returns true if row number and column number
            // is in range
            return (row >= 0) && (row < rows) &&
                   (col >= 0) && (col < columns);
        },
                
    
    self.newGame = function(){
            $scope.submitted = true;
            console.log(self.formData);
            const rows= self.formData.numberOfRows;
            const columns= self.formData.numberOfColumns;
            let mines = self.formData.numberOfMines;
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
            
            //Setting mines
            for (i=0; 0<mines; i++)
            {
               const rand1 = (Math.random()*10) % (rows*columns);
               const rand2 = (Math.random()*10) % (rows*columns);
               var x = parseInt(rand1 % rows);
               var y = parseInt(rand2 % columns);

               if (board[x][y].mineNearby !== -1)
               {
                   board[x][y].mineNearby=-1;
                   mines--;
               }
           }
           
           for (i=0; i<rows; i++) {              
                for (j=0; j<columns; j++) {
                    let count= self.countNearbyMines(i,j,board);                   
                    if (count>0 && board[i][j].mineNearby!== -1) {
                        board[i][j].mineNearby=count;
                    }            
                }
                
            }
    
           $scope.newBoard= board;
           
           const newBoard= JSON.stringify(board);

            self.formData.board=newBoard;
            self.formData.movesLeft=movesLeft;
            self.formData.currentMoveIndex=0;
            self.formData.lastTimePlayed=new Date();

            GameService.newGame(self.formData)
              .then (function(response) {
                  $scope.message = response.status;           
                  $scope.submitted = false;
                  self.formData=response.data;
                  $location.path("game/currentgame/" + response.result);
              },
              
              function (errors) {
                 
                    $scope.serverErrors=errors.data;
                    console.log(errors.data);
                    for (var errorKey in errors.data) {
                    $scope.gameForm[errorKey].$dirty = true;
                    }                 
                  
               
            });
        
        
    },
            
    self.updateGame = function(){            

            self.game.lastTimePlayed= new Date();
            self.game.board= JSON.stringify(self.parseBoard);
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
        
        
    },        
            
    self.getGame = function(id){
        GameService.getGame(id)
        .then(
            function(d) {
                 self.game = d;
                 self.parseBoard= JSON.parse(self.game.board);
                      
            },
            function(errResponse){
                console.error('Error while fetching game');             
            }            
        );

    },
            
            
   //These functions are based in
   //https://www.geeksforgeeks.org/cpp-implementation-minesweeper-game/
   //implementation in C++ and trough console
   //With a couple of modifications and refactoring for graphical javascript board
  
      
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
                
        if  (self.parseBoard[row][column].isDiscovered || self.game.finished) {
            return;
        }
        
        self.game.currentMoveIndex++;
        switch(self.parseBoard[row][column].mineNearby) {
            case -1:
              self.discoverAllCells();
              alert("YOU LOSE!");
              self.game.finished=true;
              break;
            case 0:
                if(self.game.movesLeft===1) {
                alert("YOU WIN");
                self.game.movesLeft--;
                self.game.finished=true;
            } else {
                self.discoverZeroCell(row,column); 
            }
              break;
            default:
                if (self.game.movesLeft===1) {
                    alert("YOU WIN");
                    self.game.finished=true;
                }
                 self.game.movesLeft--;
                 self.parseBoard[row][column].isDiscovered=true;
        }
        
        self.updateGame();
    },
            
    self.discoverAllCells = function()  {
        
        const rows = self.game.numberOfRows;
        const columns = self.game.numberOfColumns;
        for (i=0; i<rows; i++) {              
                for (j=0; j<columns; j++) {                    
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
    
   
    self.enableFlagMode = function()  {
        self.flagMode=true;      
    },
    
    self.putFlag = function(row,column)  {
        self.parseBoard[row][column].isFlag=true;       
    };
      

        
    if (param) {
        self.getGame(param);
    } else {
         self.getGameList();
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
            .withDisplayLength(5)
            .withOption('order', [0, 'desc'])
            .withLanguage($rootScope.resources.tableMessage);
            
    self.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2)
        
    ];
  
        
  
}]);
