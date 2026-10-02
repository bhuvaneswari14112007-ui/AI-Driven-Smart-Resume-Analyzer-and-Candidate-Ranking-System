package resume.analyser.controller.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import resume.analyser.model.ResumeResult;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ResumeService {

    public ResumeResult analyzeResume(MultipartFile file) {

        ResumeResult result = new ResumeResult();

        try {

            // Read PDF
            PDDocument document = Loader.loadPDF(file.getBytes());

            // Extract text
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);

            document.close();

            // Extract details
            String name = extractName(text);
            String email = extractEmail(text);
            String skills = extractSkills(text);
            String education = extractEducation(text);
            String experience = extractExperience(text);

            // Store results
            result.setName(name);
            result.setEmail(email);
            result.setSkills(skills);
            result.setEducation(education);
            result.setExperience(experience);

            // Temporary match score
            double score = calculateMatchScore(skills);
            result.setMatchScore(score);

            // Print result in terminal
            System.out.println("=================================");
            System.out.println("        RESUME ANALYSIS");
            System.out.println("=================================");
            System.out.println("NAME       : " + name);
            System.out.println("EMAIL      : " + email);
            System.out.println("SKILLS     : " + skills);
            System.out.println("EDUCATION  : " + education);
            System.out.println("EXPERIENCE : " + experience);
            System.out.println("MATCH SCORE: " + score + "%");
            System.out.println("=================================");

            return result;

        } catch (Exception e) {

            result.setName("Error");
            result.setEmail(e.getMessage());
            return result;
        }
    }

    // ---------------- NAME ----------------

    private String extractName(String text) {

        String[] lines = text.split("\\r?\\n");

        for (String line : lines) {

            line = line.trim();

            if (!line.isEmpty()
                    && !line.contains("@")
                    && line.length() > 2
                    && line.length() < 50) {

                return line;
            }
        }

        return "Name not found";
    }

    // ---------------- EMAIL ----------------

    private String extractEmail(String text) {

        Pattern pattern = Pattern.compile(
                "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        );

        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            return matcher.group();
        }

        return "Email not found";
    }

    // ---------------- SKILLS ----------------

    private String extractSkills(String text) {

        String lowerText = text.toLowerCase();

        StringBuilder skills = new StringBuilder();

        String[] skillList = {
                "Java",
                "Python",
                "C",
                "C++",
                "HTML",
                "CSS",
                "JavaScript",
                "SQL",
                "Spring Boot",
                "Machine Learning",
                "Data Structures",
                "Git",
                "GitHub",
                "MySQL",
                "Cybersecurity",
                "React",
                "Node.js"
        };

        for (String skill : skillList) {

            if (lowerText.contains(skill.toLowerCase())) {

                if (skills.length() > 0) {
                    skills.append(", ");
                }

                skills.append(skill);
            }
        }

        if (skills.length() == 0) {
            return "No common skills found";
        }

        return skills.toString();
    }

    // ---------------- EDUCATION ----------------

    private String extractEducation(String text) {

        String lowerText = text.toLowerCase();

        if (lowerText.contains("b.e")
                || lowerText.contains("b.tech")
                || lowerText.contains("bachelor")
                || lowerText.contains("degree")) {

            return "Education details found in resume";
        }

        return "Education not found";
    }

    // ---------------- EXPERIENCE ----------------

    private String extractExperience(String text) {

        String lowerText = text.toLowerCase();

        if (lowerText.contains("experience")
                || lowerText.contains("internship")
                || lowerText.contains("intern")) {

            return "Experience details found in resume";
        }

        return "Experience not found";
    }

    // ---------------- MATCH SCORE ----------------

    private double calculateMatchScore(String skills) {

        if (skills.equals("No common skills found")) {
            return 0;
        }

        String[] foundSkills = skills.split(",");

        double score = foundSkills.length * 5;

        if (score > 100) {
            score = 100;
        }

        return score;
    }
}