package aula_inatel.jsonPlaceholder;
import com.intuit.karate.junit5.Karate;

class jsonPlaceholderRunner {

    @Karate.Test
    Karate testJson(){
        return Karate.run("jsonPlaceholder").relativeTo(getClass());
    }
    
}
