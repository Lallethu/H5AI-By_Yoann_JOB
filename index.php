<?php  include "H5AI.php";
include 'config.php';
$tree = new H5AI($config["root"]);
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/style.css">
    <title>H5AI</title>
</head>

<body>
    <nav class="navbar mb-2">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div>
                    Base directory : <span id="base-dir"><?= $tree->getPath()?></span> &#x27a1; <span id="file"></span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div class="container-fluid gap-1">
        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-4">
            <button class="btn-line-primary text-muted-dark-5 text-hover-black mr-1 mb-1" id="previous">Previous</button>
            <button class="btn-line-primary text-muted-dark-5 text-hover-black mr-1" id="clear-preview">Clear preview</button>
            <button class="btn-line-warning text-black text-hover-black mr-1" id="force-clear">Force close directories</button>
            <div class="tree mt-1"><?php $tree->showFiles($tree->getPath(), $tree->getTree())?></div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-5  col-lg-4 col-xl-4">
            <pre class="card bg-gray-dark-6 text-white tree" id="preview">Preview* ...<br><span><code>*Comments in code files are now read !</code></span></pre>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-4 col-xl-4">
            <div class="card read-me">
                <div class="card-title"><h1>README</h1></div>
                <div class="card-body">
                    <h1><u>Global usage:</u></h1>
                    <ul>
                        <li class="font-md"><img src="assets/folder-solid.svg" alt="Folder Icon"><strong class="font-lg">Folders/Directories</strong> : When clicked on, the global path changes to apply the folder/directory, content appears bellow the clicked folder, and vis versa.</li><br>
                        <li class="font-md"><strong class="font-lg">Files/Images/Mp3</strong> : Will display (when possible) in the preview section the content of the clicked file, will allow the user to listen to a mp3 file in case there is one.</li><br>
                    </ul><br>
                    <h2><u>Buttons usage :</u><div class="btn btn-line-secondary ml-1">button</div></h2>
                    <ul>
                        <li class="font-md"><strong class="font-lg">Previous</strong> : Will take away one directory from your current position.</li><br>
                        <li class="font-md"><strong class="font-lg">Clear preview</strong> : Will erase the current preview content.</li><br>
                        <li class="font-md"><strong class="font-lg">Force close directories</strong> : Will close every open directories.</li><br>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="app.js"></script>
</body>

</html>