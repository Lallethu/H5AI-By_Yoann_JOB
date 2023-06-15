<?php
class H5AI {
    private $_tree;
    private $_path;

    public function __construct($path) {
        $this->_path = $path;
        $this->_tree = [];
    }

    public function getTree() {
        return $this->_tree;
    }

    public function getPath() {
        return $this->_path;
    }

    private function getFiles($path) {
        $files = [];
        $directory_handle = opendir($path);

        while ($file = readdir($directory_handle)) {
            if ($file == '.' || $file == '..') continue;
            $files[] = $path . DIRECTORY_SEPARATOR . $file;
        }

        closedir($directory_handle);
        return $files;
    }
    
    private function getFileSpecs($file) {
        return [filesize($file), date('d-m-Y H:i', filemtime($file)), "file"];
    }

    private function convertOctets($amount) {
        $ratio_octets = 1000;
        $array_units = ['octets', 'Ko', 'Mo', 'Go', 'To'];
        $i = 0;
        while ($amount >= $ratio_octets && $i < 4) {
            $amount /= $ratio_octets;
            $i++;
        }
        return round($amount, 2) . ' ' . $array_units[$i];
    }

    private function fileDisplay($text, $size, $last_update, $type) {
        echo "<div class='close-dir $type'>
        <div><img class='icon'>$text</div>
        <span>File size : " . $this->convertOctets($size) . "</span>
        <br>
        <span>Last update : $last_update</span>
        </div>";
    }

    public function showFiles($path, $parent) {
        $files = $this->getFiles($path);
        foreach ($files as $file) {
            $branch = ["text" => basename($file)];
            if (is_dir($file)) {
                $branch["type"] = "folder";
                $branch["children"] = [];
                echo "<div class='" . $branch["type"] . " close-dir'>
                <div class='title svg'>" . $branch["text"] . "</div>
                <div class='content'>";
                $this->showFiles($file, $branch["children"]);
                echo "</div></div>";
            } else {
                [$branch["size"], $branch["file_last_update"], $branch["type"]] = $this->getFileSpecs($file);
                $this->fileDisplay($branch["text"], $branch["size"], $branch["file_last_update"], $branch["type"]);
            }
            $parent[] = $branch;
        }
    }
}
?>