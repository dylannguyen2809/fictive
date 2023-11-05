import React, {useState, useEffect} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chapter from './Chapter';

function Story(props) {
    const [chapters, setChapters] = useState([]);
    const [selection, setSelection] = useState('');

    const theme = createTheme({
        palette: {
            primary: {
              main: '#176273', // Change the primary color
            },
            secondary: {
              main: '#D4BF80', // Change the secondary color
            },
            lighttext: {
                main: '#F2F3D4',
            }
          },
        typography: {
            fontFamily: 'Henny Penny, sans-serif', // Set the font-family for all text
            allVariants: {
                color: 'white', // Set the text color to white for all typography variants
                textShadow: '2px 2px 4px rgba(0, 0, 0, 1)', // Add a black text shadow
            },
        },
    }); // Create a theme instance
    
    const getImage = async (chapter, genre) => {
      try {
        const reqParams = {
          prompt: chapter,
          theme: genre,
        };
  
        const response = await fetch('/generate-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqParams),
        });
  
        if (!response.ok) {
          throw new Error(`Network response was not ok (status: ${response.status})`);
        }
  
        const data = await response.json();
  
        return data.images;
      } catch (error) {
        console.error('Error fetching image data:', error);
        return null;
      }
    };
  
    const handleInit = async (data) => {
      try {
        const imURL = await getImage(data.chapter, props.formData.theme);
        if (imURL) {
          const newChapter = {
            chapterName: data.chapter,
            chapterContent: data.story,
            choice1: data.choices[0],
            choice2: data.choices[1],
            chapterImg: imURL[0],
            choice1Img: imURL[1],
            choice2Img: imURL[2],
            selectedChoice: null,
            currentChapter: true,
          };
          setChapters([newChapter]);
        }
      } catch (error) {
        console.error('Error initializing chapter:', error);
      }
    };

    const handleSelection = (data) => {
      console.log(data);
      setSelection(data);
    }

    //continue story
    const handleContinue = async () => {
      const reqParams = {
        choice: selection,
      }
      //get chatgpt data for choice
      fetch('/continue_adventure', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqParams), // body data type must match "Content-Type" header
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok (status: ${response.status})`);
          }
          return response.json();
        })
        //SUCCESS - UPDATE STATE
        .then(async data => {
          var tmp =  Array.from(chapters);
          const imURL = await getImage(data.chapter, props.formData.theme);
          console.log(tmp)
          //set current last element to have current selection value
          tmp[tmp.length-1] = {
            chapterName: tmp[tmp.length-1].chapterName,
            chapterContent: tmp[tmp.length-1].chapterContent,
            choice1: tmp[tmp.length-1].choice1,
            choice2: tmp[tmp.length-1].choice2,
            chapterImg: tmp[tmp.length-1].chapterImg,
            choice1Img: '/default1.png',
            choice2Img: '/default2.png',
            selectedChoice: selection,
            currentChapter: false,
          };

          tmp.push({
            chapterName: data.chapter,
            chapterContent: data.story,
            choice1: data.choices[0],
            choice2: data.choices[1],
            chapterImg: imURL[0],
            choice1Img: imURL[1],
            choice2Img: imURL[2],
            selectedChoice: null,
            currentChapter: true,
          })
          setChapters(tmp);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          if (error.response) {
            error.response.text().then(text => {
              console.error('Response content:', text);
            });
        }
      });
    }

    const handleEnd = async () => {
      console.log('END button clicked');
      const reqParams = {};
    
      try {
        const response = await fetch('/end_adventure', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqParams),
        });
    
        if (!response.ok) {
          throw new Error(`Network response was not ok (status: ${response.status})`);
        }
    
        const data = await response.json();
    
        var tmp = Array.from(chapters);
        const imURL = await getImage('epilogue', props.formData.theme);
    
        tmp[tmp.length - 1] = {
          chapterName: tmp[tmp.length - 1].chapterName,
          chapterContent: tmp[tmp.length - 1].chapterContent,
          choice1: tmp[tmp.length - 1].choice1,
          choice2: tmp[tmp.length - 1].choice2,
          chapterImg: '/defaultmain.png',
          choice1Img: '/default1.png',
          choice2Img: '/default2.png',
          selectedChoice: selection,
          currentChapter: false,
        };
    
        tmp.push({
          chapterName: 'Epilogue',
          chapterContent: data.epilogue,
          choice1: null,
          choice2: null,
          chapterImg: imURL[0],
          choice1Img: '/default1.png',
          choice2Img: '/default2.png',
          selectedChoice: null,
          currentChapter: false,
        });
        setChapters(tmp);
      } catch (error) {
        console.error('Error handling "END" button click:', error);
        if (error.response) {
          error.response.text().then(text => {
            console.error('Response content:', text);
          });
        }
      }
    };

    //on render: make chatgpt request
    useEffect(() => {
      const reqParams = {
        name: props.formData.name,
        gender: props.formData.gender,
        appearance: props.formData.appearance,
        genre: props.formData.theme,
        language: props.formData.language,
        purpose: props.formData.purpose,
      }
      console.log(reqParams)
      fetch('/start_adventure', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqParams), // body data type must match "Content-Type" header
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok (status: ${response.status})`);
        }
        return response.json();// parses JSON response into native JavaScript objects
      })
      .then(data => handleInit(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        if (error.response) {
          error.response.text().then(text => {
            console.error('Response content:', text);
          });
      }
      });
    }, []);
  
    const chapterArr = chapters.map((data) => 
    <Chapter
      chapterName={data.chapterName}
      chapterContent={data.chapterContent}
      choice1={data.choice1}
      choice2={data.choice2}
      currentChapter={data.currentChapter}
      selectedChoice={data.selectedChoice}
      selectionText={selection}
      handleSelectionText={handleSelection}
      handleContinue={handleContinue}
      handleEnd={handleEnd}
      chapterImg={data.chapterImg}
      choice1Img={data.choice1Img}
      choice2Img={data.choice2Img}
    />);

    return (
      <div className="Story">
        <ThemeProvider theme={theme}>
            <Box
                style={{
                    background: `url('/background.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: '-1',
                    width: '100%',
                }}
                >
                  {chapterArr}
            </Box>
        </ThemeProvider>
      </div>
    );
}

export default Story;