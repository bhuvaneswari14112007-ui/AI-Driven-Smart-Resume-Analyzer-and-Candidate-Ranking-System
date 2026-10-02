package resume.analyser.controller;

import resume.analyser.controller.service.ResumeService;
import resume.analyser.model.ResumeResult;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "*")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/upload")
    public ResumeResult uploadResume(
            @RequestParam("file") MultipartFile file) {

        if (file == null || file.isEmpty()) {

            ResumeResult result = new ResumeResult();

            result.setName("No resume uploaded");
            result.setEmail("");
            result.setSkills("");
            result.setEducation("");
            result.setExperience("");
            result.setMatchScore(0);

            return result;
        }

        return resumeService.analyzeResume(file);
    }
}
