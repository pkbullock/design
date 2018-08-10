/**********************************************************

ADOBE SYSTEMS INCORPORATED 
Copyright 2005-2010 Adobe Systems Incorporated 
All Rights Reserved 

NOTICE:  Adobe permits you to use, modify, and 
distribute this file in accordance with the terms
of the Adobe license agreement accompanying it.  
If you have received this file from a source 
other than Adobe, then your use, modification,
or distribution of it requires the prior 
written permission of Adobe. 

Modified by Paul Bullock using the Save to PDF Sample:


*********************************************************/

/**********************************************************
 
Save from EPS to AI Files.jsx

DESCRIPTION

This sample gets files specified by the user from the 
selected folder and batch processes them and saves them 
as Ai Files from EPS in the user desired destination with the same 
file name.
 
**********************************************************/

// Main Code [Execution of script begins here]

// uncomment to suppress Illustrator warning dialogs
// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, saveOptions;

// Select the source folder.
sourceFolder = Folder.selectDialog( 'Select the folder with EPS files you want to convert to Ai Files', '~' );

// If a valid folder is selected
if ( sourceFolder != null )
{
	files = new Array();
	fileType = '*.eps'
	
	// Get all files matching the pattern
	files = sourceFolder.getFiles( fileType );
	
	if ( files.length > 0 )
	{
		// Get the destination to save the files
		destFolder = sourceFolder; // Output to the same folder
		for ( i = 0; i < files.length; i++ )
		{
			sourceDoc = app.open(files[i]); // returns the document object
									
			// Call function getNewName to get the name and file to save the pdf
			targetFile = getNewName();
			
			// Call function get save options
			saveOptions = getAiSaveOptions();
			
			// Save as pdf
			sourceDoc.saveAs( targetFile, saveOptions );
			
			sourceDoc.close();
		}
		alert( 'Files are saved as Ai in ' + destFolder );
	}
	else
	{
		alert( 'No matching files found' );
	}
}




/*********************************************************

getNewName: Function to get the new file name. The primary
name is the same as the source file.

**********************************************************/

function getNewName()
{
	var ext, docName, newName, saveInFile, docName;
	docName = sourceDoc.name;
	ext = '.ai'; // new extension for pdf file
	newName = "";
		
	for ( var i = 0 ; docName[i] != "." ; i++ )
	{
		newName += docName[i];
	}
	newName += ext; // full pdf name of the file
	
	// Create a file object to save the pdf
	saveInFile = new File( destFolder + '/' + newName );
	

	return saveInFile;
}



/*********************************************************

getAiSaveOptions: Function to set the AI saving options of the 
files using the IllustratorSaveOptions object.

**********************************************************/

function getAiSaveOptions (){
	
	var saveOptions = new IllustratorSaveOptions();
	saveOptions.pdfCompatible = true;

	return saveOptions;

}
